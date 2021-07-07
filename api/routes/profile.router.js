const { checkAuth } = require('../../utils')

const {
  updateProfile,
  getAllProfiles,
  getCurrentProfile,
  updateCurrentProfile
} = require('../controllers/profile.controller')

const router = require('express').Router()

router.get('/current', checkAuth, getCurrentProfile)
router.post('/current', checkAuth, updateCurrentProfile)
router.post('/:profileId', checkAuth, updateProfile)
router.get('/', /* checkAuth, */ getAllProfiles)

exports.profileRouter = router
