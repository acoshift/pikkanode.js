const getHandler = (ctx) => {
	ctx.body = 'sign in get handler'
}

const postHandler = (ctx) => {
	ctx.body = 'sign in post handler'
}

module.exports = {
	getHandler,
	postHandler
}
