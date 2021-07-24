const mongoose = require('mongoose')

const bookingTypesSchema = new mongoose.Schema({
  profile:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  duration: Number,
  price: Number,
  availability: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'TimeSlot'
  }
})

exports.bookingTypesModel = mongoose.model('BookingTypes', bookingTypesSchema)
