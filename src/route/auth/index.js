const Router = require('koa-router')

const signIn = require('./signin')
const signUp = require('./signup')

const router = new Router()

router.get('/signin', signIn.getHandler)
router.post('/signin', signIn.postHandler)
router.get('/signup', signUp.getHandler)
router.post('/signup', signUp.postHandler)

module.exports = router.routes()
