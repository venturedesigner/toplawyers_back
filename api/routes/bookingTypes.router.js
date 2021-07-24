const { checkAuth } = require('../../utils')

const {
  getBookingTypeByProfileId,
  updateOrCreateBookingTypes
} = require('../controllers/bookingTypes.controller')

const router = require('express').Router()

router.get('/:profileId', getBookingTypeByProfileId)
router.put('/', checkAuth, updateOrCreateBookingTypes)

exports.bookingTypesRouter = router
