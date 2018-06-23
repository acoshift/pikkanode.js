const { user } = require('../../../repository')

const getHandler = (ctx) => {
	ctx.body = 'sign up get handler'
}

const postHandler = async (ctx) => {
	const { email, password } = ctx.request.body
	// TODO: validate email, password
	const userId = await user.register(email, password)

	// TODO: handle user id ?
}

module.exports = {
	getHandler,
	postHandler
}
