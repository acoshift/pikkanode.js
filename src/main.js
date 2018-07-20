const Koa = require('koa')
const koaBody = require('koa-body')
const session = require('koa-session')
const cors = require('@koa/cors')
const redis = require('redis')
const bluebird = require('bluebird')
const config = require('../config')
const pool = require('./db')
const AppError = require('./util/appError')

bluebird.promisifyAll(redis)
const redisClient = redis.createClient(config.redis)
redisClient.on('error', console.error)

let isShutingDown = false

const app = new Koa()
app.keys = ['super fucking secret']

const sessionConfig = {
  key: 'pikkanode:sess',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  store: {
    async get (key, maxAge, { rolling }) {
      const sess = await redisClient.getAsync(key)
      return JSON.parse(sess)
    },
    async set (key, sess, maxAge, { rolling }) {
      await redisClient.setAsync(key, JSON.stringify(sess))
    },
    async destroy (key) {
      await redisClient.delAsync(key)
    }
  }
}

// throwAppError checks app error and return error message to client
app.context.throwAppError = function (err) {
  if (err && err.name === 'AppError') {
    this.status = err.status
    this.body = { error: err.message }
    return
  }
  console.error(err.message)
  this.throw()
}

const handleError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.throwAppError(err)
  }
}

app
  .use(handleError)
  .use(cors({ credentials: true }))
  .use(session(sessionConfig, app))
  .use(koaBody({
    multipart: true,
    onError: function (err) {
      throw new AppError(err.message, 400)
    }
  }))
  .use(require('./route'))
const server = app.listen(8080)

// health check
const health = new Koa()
health.use(ctx => {
  if (ctx.path === '/healthz' && !isShutingDown) {
    ctx.body = ''
    return
  }
  ctx.status = 500
  ctx.body = 'not ok'
})
health.listen(18080)

// graceful shutdown
async function shutdown (code) {
  isShutingDown = true
  console.log(`shuting down server`)
  server.close(async () => {
    await Promise.all([redisClient.quitAsync(), pool.end()])
    console.log(`server stopped by ${code}`)
    process.exit()
  })
}

const shutdownEvents = ['SIGINT', 'SIGQUIT', 'SIGTERM', 'SIGHUP', 'SIGSTP']
shutdownEvents.forEach(event => process.on(event, () => shutdown(event)))
