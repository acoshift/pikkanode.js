const getHandler = (ctx) => {
	ctx.body = 'detail page ' + ctx.params.id
}

module.exports = {
	getHandler
}
