const { checkAuth } = require('../../utils')

const {
  getToken
} = require('../controllers/twilio.controller')

const router = require('express').Router()

router.get('/token', checkAuth, getToken)

exports.twilioRouter = router
