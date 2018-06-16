const Router = require('koa-router')

const create = require('./create')
const detail = require('./detail')
const comment = require('./comment')
const like = require('./like')

const router = new Router()

router.get('/create', create.getHandler)
router.post('/create', create.postHandler)
router.get('/pikka/:id', detail.getHandler)
router.post('/pikka/:id/comment', comment.postHandler)
router.post('/pikka/:id/like', like.postHandler)

module.exports = router.routes()
