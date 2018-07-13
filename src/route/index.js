const Router = require('koa-router')

const router = new Router()

router.use(require('./controller'))
router.use('/api', require('./api'))
router.get('/healthz', ctx => { ctx.body = '' })

module.exports = router.routes()
