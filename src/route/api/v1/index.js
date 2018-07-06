// api/v1/index.js
const Router = require('koa-router')

const router = new Router()

router.use('/auth', require('./auth'))
router.use('/pikka', require('./pikka'))

module.exports = router.routes()
