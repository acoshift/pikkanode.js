const Router = require('koa-router')

const router = new Router()

router.get('/', list)
router.post('/', create)
router.get('/:id', get)
router.post('/:id/comment', createComment)
router.put('/:id/like', like)
router.delete('/:id/like', unlike)

module.exports = router.routes()

function list (ctx) {
  ctx.status = 500
  ctx.body = {
    error: 'list not implement'
  }
}

function create (ctx) {
  ctx.status = 500
  ctx.body = {
    error: 'create not implement'
  }
}

function get (ctx) {
  ctx.status = 500
  ctx.body = {
    error: 'get not implement'
  }
}

function createComment (ctx) {
  ctx.status = 500
  ctx.body = {
    error: 'createComment not implement'
  }
}

function like (ctx) {
  ctx.status = 500
  ctx.body = {
    error: 'like not implement'
  }
}

function unlike (ctx) {
  ctx.status = 500
  ctx.body = {
    error: 'unlike not implement'
  }
}
