const { checkAuth } = require('../../utils')

const {
  updateProfile,
  getAllProfiles,
  getCurrentProfile,
  updateCurrentProfile,
  getProfileByUserName
} = require('../controllers/profile.controller')

const router = require('express').Router()

router.get('/current', checkAuth, getCurrentProfile)
router.post('/current', checkAuth, updateCurrentProfile)
router.get('/:username', getProfileByUserName)
router.post('/:profileId', checkAuth, updateProfile)
router.get('/', getAllProfiles)

exports.profileRouter = router
