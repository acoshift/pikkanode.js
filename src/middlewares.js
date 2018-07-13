module.exports = {
  async isUser (ctx, next) {
    if (ctx.session && !ctx.session.userId) {
      ctx.status = 401
      ctx.body = {
        error: 'unauthorized'
      }
      return
    }

    await next()
  }
}
