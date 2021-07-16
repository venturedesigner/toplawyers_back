const { bookingTypesModel } = require('../models/bookingTypes.model')

exports.getBookingTypeByProfileId = (req, res) => {
  bookingTypesModel
    .find({ profile: req.params.profileId })
    .then(bookingTypes => {
      console.log(bookingTypes)
      res.status(200).json(bookingTypes)
    })
    .catch(err => console.error('Error getting all profile', err))
}
