const {
  signUp,
  login,
  logout
} = require('../controllers/auth.controller')

const {
  checkAuth,
  uniqueUsername,
  uniqueEmail
} = require('../../utils/')

const router = require('express').Router()

router.post('/signup', uniqueUsername, uniqueEmail, signUp)
router.post('/login', login)
router.post('/logout', checkAuth, logout)

exports.authRouter = router
