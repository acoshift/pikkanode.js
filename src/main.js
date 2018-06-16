const Koa = require('koa')
const koaBody = require('koa-body')
const serve = require('koa-static')

const app = new Koa()

const stripPrefix = async (ctx, next) => {
	if (!ctx.path.startsWith('/-')) {
		ctx.status = 404
		return
	}

	ctx.path = ctx.path.slice(2)
	await next()
}

app.use(koaBody({ multipart: true }))
app.use(require('./route'))

app.use(stripPrefix)
app.use(serve('public'))

app.listen(8000)
