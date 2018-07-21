// api/v1/index.js
const Router = require('koa-router')

const router = new Router()

router.use('/auth', require('./auth'))
router.use('/pikka', require('./pikka'))
router.use('/user', require('./user'))

module.exports = router.routes()
