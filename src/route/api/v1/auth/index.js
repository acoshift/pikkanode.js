const Router = require('koa-router')

const router = new Router()

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/signout', signOut)

module.exports = router.routes()

function signIn (ctx) {
	ctx.status = 500
	ctx.body = {
		error: 'sign in not implement'
	}
}

function signUp (ctx) {
	ctx.status = 500
	ctx.body = {
		error: 'sign up not implement'
	}
}

function signOut (ctx) {
	ctx.status = 500
	ctx.body = {
		error: 'sign out not implement'
	}
}
