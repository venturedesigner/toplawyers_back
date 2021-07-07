const { checkAuth } = require('../../utils')

const {
  updateProfile,
  getAllProfiles,
  getCurrentProfile
} = require('../controllers/profile.controller')

const router = require('express').Router()

router.post('/:profileId', checkAuth, updateProfile)
router.get('/', /* checkAuth, */ getAllProfiles)
router.get('/current', checkAuth, getCurrentProfile)

exports.profileRouter = router
