// api/v1/index.js
const Router = require('koa-router')
const { isUser } = require('../../../middlewares')

const router = new Router()

router.use('/auth', require('./auth'))
router.use('/pikka', isUser, require('./pikka'))

module.exports = router.routes()
