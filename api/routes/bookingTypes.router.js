const { checkAuth } = require('../../utils')

const {
  getBookingTypeByProfileId,
  updateOrCreateBookingTypes,
  deleteBookingTypeById
} = require('../controllers/bookingTypes.controller')

const router = require('express').Router()

router.get('/:profileId', getBookingTypeByProfileId)
router.put('/', checkAuth, updateOrCreateBookingTypes)
router.delete('/:id', checkAuth, deleteBookingTypeById)

exports.bookingTypesRouter = router
