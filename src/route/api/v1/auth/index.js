const Router = require('koa-router')
const auth = require('../../../../service/auth')

const router = new Router()

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/signout', signOut)

module.exports = router.routes()

async function signIn (ctx) {
	const { email, password } = ctx.request.body

	try {
		const ok = await auth.signIn(email, password)

		if (!ok) {
			ctx.status = 400
			ctx.body = {
				error: 'wrong email or password'
			}
			return
		}

		ctx.body = {}
	} catch (err) {
		ctx.status = 400
		ctx.body = {
			error: err.message
		}
		return
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
