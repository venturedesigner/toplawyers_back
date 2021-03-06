const { checkAuth, isAdmin } = require('../../utils')

const {
  getUsers,
  updateUser
  // getProfile,
  // getMyChannels,
  // getFollowedChannels,
  // createProfile,
  // updateRoleRequestInfo,
  // changeTypeOfUser,
  // makeCreator
} = require('../controllers/user.controller')

const router = require('express').Router()

router.get('', checkAuth, isAdmin, getUsers)
router.post('/update', checkAuth, updateUser)
// router.get('/:userId/profile', checkAuth, getProfile)
// router.get('/mychannels', checkAuth, getMyChannels)
// router.post('/profile', checkAuth, createProfile)
// router.post('/creator', checkAuth, updateRoleRequestInfo)
// router.post('/users', checkAuth, isAdmin, changeTypeOfUser)
// router.post('/users', checkAuth, isModerator, makeCreator)

exports.userRouter = router
