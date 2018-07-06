const Router = require('koa-router')
const pictureService = require('../../../../service/picture')
const { picture } = require('../../../../repository')

const router = new Router()

router.get('/', list)
router.post('/', validateInput, create)
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

const allowFileType = {
  'image/png': true,
  'image/jpeg': true
}

async function validateInput (ctx, next) {
  const { picture } = ctx.request.files
  const { caption } = ctx.request.body

  if (!caption) {
    ctx.status = 400
    ctx.body = { error: 'caption required' }
    return
  }

  if (!picture) {
    ctx.status = 400
    ctx.body = { error: 'picture required' }
    return
  }

  if (!allowFileType[picture.type]) {
    ctx.status = 400
    ctx.body = { error: 'file type not allowed' }
    return
  }

  await next()
}

async function create (ctx) {
  const id = await pictureService.createPikka(
    ctx.session.userId,
    ctx.request.body.caption,
    ctx.request.files.picture.path
  )
  const createdAt = await picture.getCreatedAtById(id)
  if (!createdAt) {
    ctx.throw()
  }

  ctx.body = {
    id,
    createdAt
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
