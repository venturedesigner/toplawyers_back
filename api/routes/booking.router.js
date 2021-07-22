const { checkAuth, isPayed } = require('../../utils')

const {
  newBooking,
  getMyBookingsAsProfessional,
  getMyBookingsAsClient
} = require('../controllers/booking.controller')


const router = require('express').Router()

router.get('/professional', checkAuth, getMyBookingsAsProfessional)
router.get('/client', checkAuth, getMyBookingsAsClient)
router.post('/', checkAuth, isPayed, newBooking)
// router.post('/', checkAuth, isAdmin, createBlock)

exports.bookingRouter = router
