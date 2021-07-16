// const { checkAuth } = require('../../utils')

const {
  getBookingTypeByProfileId
} = require('../controllers/bookingTypes.controller')

const router = require('express').Router()

router.get('/:profileId', getBookingTypeByProfileId)

exports.bookingTypesRouter = router
