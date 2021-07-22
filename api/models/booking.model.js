const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  professional_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  startBook: Date,
  endBook: Date,
  duration: Number,
  price: Number,
  status: {
    type: String,
    enum: ['request', 'booked', 'cancelled', 'done'],
    default: 'request'
  },
  minutes: Number,
  paid: Boolean,
  charged: Number,
  currency: {
    type: String,
    enum: ['USD', 'EUR']
  }
})

exports.bookingModel = mongoose.model('Booking', bookingSchema)
