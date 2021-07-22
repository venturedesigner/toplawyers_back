const mongoose = require('mongoose')

const overwriteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    unique: true
  },
  blocks: [{ // monday
    start: {
      type: String
    },
    end: {
      type: String
    }
  }]

})

exports.overwriteModel = mongoose.model('Overwrite', overwriteSchema)
