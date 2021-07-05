const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  profilepic: String,
  profilevideo: String,
  description: String,
  skills: [String],
  education: String,
  experience: String,
  approved: { // only admin can change
    type: Boolean,
    default: false
  },
  show: { // only admin can change
    type: Boolean,
    default: false
  },
  linkedin: String,
  twitter: String,
  github: String,
  tiktok: String,
  instagram: String,
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  bookingTypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookingTypes'
  }],
  languages: {
    type: [String],
    enum: [
      'English',
      'French',
      'Spanish',
      'Arabic',
      'Mandarin',
      'Russian',
      'German',
      'Portuguese',
      'Japanese',
      'Hindi',
      'Malay',
      'Persian',
      'Swahili',
      'Tamil',
      'Italian',
      'Dutch',
      'Bengali',
      'Turkish',
      'Vietnamese',
      'Polish',
      'Javanese',
      'Punjabi',
      'Thai',
      'Korean'
    ]
  }
})

exports.profileModel = mongoose.model('Profile', profileSchema)
