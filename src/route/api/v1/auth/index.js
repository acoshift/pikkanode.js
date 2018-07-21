const Router = require('koa-router')
const auth = require('../../../../service/auth')
const repo = require('../../../../repository')

const router = new Router()

router.post('/signin', validateInput, signIn)
router.post('/signup', validateInput, signUp)
router.post('/signout', signOut)

module.exports = router.routes()

async function validateInput (ctx, next) {
  const { email, password } = ctx.request.body
  if (!email) {
    ctx.status = 400
    ctx.body = {
      error: 'email required'
    }
    return
  }

  if (!password) {
    ctx.status = 400
    ctx.body = {
      error: 'password required'
    }
    return
  }

  if (password.length < 6) {
    ctx.status = 400
    ctx.body = {
      error: 'password too short'
    }
    return
  }

  const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/
  if (!emailRegex.test(email)) {
    ctx.status = 400
    ctx.body = {
      error: 'invalid email'
    }
    return
  }

  await next()
}

async function signIn (ctx) {
  const { password } = ctx.request.body
  const email = ctx.request.body.email.toLowerCase()

  const ok = await auth.verifyEmailAndPassword(email, password)
  if (!ok) {
    ctx.status = 400
    ctx.body = {
      error: 'wrong email or password'
    }
    return
  }

  ctx.session.userId = await repo.user.getIdByEmail(email)
  ctx.body = {}
}

async function signUp (ctx) {
  const { email, password } = ctx.request.body

  const insertId = await auth.signUp(email.toLowerCase(), password)
  ctx.body = { userId: insertId }
}

function signOut (ctx) {
  ctx.session = null
  ctx.body = {}
}
