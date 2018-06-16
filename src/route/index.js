const Router = require('koa-router')

const router = new Router()

router.use(require('./auth'))
router.use(require('./pikka'))

module.exports = router.routes()
