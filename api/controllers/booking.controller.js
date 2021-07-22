const { bookingModel } = require('../models/booking.model')

exports.newBooking = (req, res, next) => {
  bookingModel
    .create({
      client_id: res.locals.user._id,
      professional_id: req.body.professional_id,
      startBook: req.body.startBook,
      endBook: req.body.endBook,
      duration: req.body.duration,
      price: req.body.price,
      currency: req.body.currency,
      status: 'request'
    })
    .then(booking => {
      res.locals.booking = booking
      res.status(200).json(booking)
    })
    .catch(err => {
      res.status(401).json({ msg: 'An error ocurred trying to create booking', err })
    })
}

exports.getMyBookingsAsProfessional = (req, res, next) => {
  bookingModel
    .find({professional_id: res.locals.user._id })
    .then(bookings => {
      res.status(200).json(bookings)
    })
    .catch(err => {
      res.status(500).json({ msg: 'An error ocurred retrieving your overwrites', err })
    })
}

exports.getMyBookingsAsClient = (req, res, next) => {
  bookingModel
    .find({client_id: res.locals.user._id })
    .then(bookings => {
      res.status(200).json(bookings)
    })
    .catch(err => {
      res.status(500).json({ msg: 'An error ocurred retrieving your overwrites', err })
    })
}
