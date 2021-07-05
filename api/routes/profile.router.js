const { checkAuth } = require('../../utils')

const {
  updateProfile
} = require('../controllers/profile.controller')

const router = require('express').Router()

router.post('/:profileId', checkAuth, updateProfile)

exports.profileRouter = router
