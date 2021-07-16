const { authRouter } = require('./auth.router')
const { userRouter } = require('./user.router')
const { profileRouter } = require('./profile.router')
const { bookingTypesRouter } = require('./bookingTypes.router')
// const { channelRouter } = require('./channel.router')
// const { postRouter } = require('./post.router')
// const { tagRouter } = require('./tag.router')
// const { commentRouter } = require('./comment.router')

const router = require('express').Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/profiles', profileRouter)
router.use('/bookingtypes', bookingTypesRouter)
// router.use('/channels', channelRouter)
// router.use('/post', postRouter)
// router.use('/tag', tagRouter)
// router.use('/comments', commentRouter)

exports.router = router
