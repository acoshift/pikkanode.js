const Router = require('koa-router')
const pictureService = require('../../../../service/picture')
const commentService = require('../../../../service/comment')
const repo = require('../../../../repository')
const { isUser } = require('../../../../middlewares')
const gcs = require('../../../../service/gcs')

const router = new Router()

router.get('/', list)
router.post('/', isUser, validateInput, create)
router.get('/:id', validatePikkaId, get)
router.delete('/:id', validatePikkaId, remove)
router.post('/:id/comment', isUser, validatePikkaId, createComment)
router.put('/:id/like', isUser, validatePikkaId, like)
router.delete('/:id/like', isUser, validatePikkaId, unlike)

module.exports = router.routes()

async function list (ctx) {
  const list = await repo.picture.list()
  ctx.body = {
    list: list.map(i => (
      {
        ...i,
        picture: gcs.getUrl(i.id)
      }
    ))
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
  const id = await pictureService.create(
    ctx.request.body.caption,
    ctx.request.files.picture,
    ctx.session.userId
  )

  const createdAt = await repo.picture.getCreatedAtById(id)
  if (!createdAt) {
    ctx.throw()
  }

  ctx.body = {
    id,
    createdAt
  }
}

async function validatePikkaId (ctx, next) {
  if (!ctx.params.id) {
    ctx.status = 400
    ctx.body = {
      error: 'id required'
    }
    return
  }

  await next()
}

async function get (ctx) {
  const pikka = await repo.picture.get(ctx.params.id)
  if (!pikka) {
    ctx.status = 400
    ctx.body = {
      error: 'pikka not found'
    }
    return
  }

  const comments = await repo.comment.findByPictureId(pikka.id)

  pikka.picture = gcs.getUrl(pikka.id)
  pikka.comments = comments

  ctx.body = pikka
}

async function createComment (ctx) {
  const { text } = ctx.request.body
  const pictureId = ctx.params.id
  if (!text) {
    ctx.status = 400
    ctx.body = {
      error: 'text required'
    }
    return
  }

  const commentId = await commentService.create(text, pictureId, ctx.session.userId)
  const createdAt = await repo.comment.getCreatedAtById(commentId)
  if (!createdAt) {
    ctx.throw()
  }

  ctx.body = {
    commentId,
    createdAt
  }
}

async function like (ctx) {
  await pictureService.like(ctx.session.userId, ctx.params.id)
  ctx.body = {}
}

async function unlike (ctx) {
  await pictureService.unlike(ctx.session.userId, ctx.params.id)
  ctx.body = {}
}

async function remove (ctx) {
  await repo.picture.remove(ctx.params.id)
  ctx.body = {}
}
