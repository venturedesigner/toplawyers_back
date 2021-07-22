const { authRouter } = require('./auth.router')
const { userRouter } = require('./user.router')
const { profileRouter } = require('./profile.router')
const { bookingTypesRouter } = require('./bookingTypes.router')
const { calendarRouter } = require('./calendar.router')
const { bookingRouter } = require('./booking.router')
const { overwriteRouter } = require('./overwrite.router')

const router = require('express').Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/profiles', profileRouter)
router.use('/bookingtypes', bookingTypesRouter)
router.use('/calendars', calendarRouter)
router.use('/bookings', bookingRouter)
router.use('/overwrites', overwriteRouter)

exports.router = router
