const Router = require('koa-router')
const repo = require('../../../../repository')
const { isUser } = require('../../../../middlewares')

const router = new Router()

router.get('/profile', isUser, profile)

module.exports = router.routes()

async function profile (ctx) {
  const email = await repo.user.getEmailById(ctx.session.userId || '')
  ctx.body = { email }
}
