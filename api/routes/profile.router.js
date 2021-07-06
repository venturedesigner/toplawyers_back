const { checkAuth } = require('../../utils')

const {
  updateProfile,
  getAllProfiles
} = require('../controllers/profile.controller')

const router = require('express').Router()

router.post('/:profileId', checkAuth, updateProfile)
router.get('/', /* checkAuth, */ getAllProfiles)

exports.profileRouter = router
