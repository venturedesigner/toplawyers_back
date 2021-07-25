const { bookingTypesModel } = require("../models/bookingTypes.model");

exports.getBookingTypeByProfileId = (req, res) => {
  bookingTypesModel
    .find({ profile: req.params.profileId })
    .then((bookingTypes) => {
      console.log(bookingTypes);
      res.status(200).json(bookingTypes);
    })
    .catch((err) => console.error("Error getting bookings", err));
}

exports.updateOrCreateBookingTypes = (req, res) => {
  console.log('<<<<<<<<<<<<<<<<<<<<<< updateOrCreateBookingTypes >>>>>>>>>>>>>>>>>>>>')
  if (req.body._id !== undefined) {
    bookingTypesModel
      .findByIdAndUpdate(req.body._id, req.body, { new: true })
      .then((bookingTypes) => {
        if (Object.keys(bookingTypes).length > 0) {
          console.log("if", Object.keys(bookingTypes).length);
          bookingTypes.save();
          res.status(200).json(bookingTypes);
        } else {
          console.log("sin resultado");
        }
      })
      .catch((err) => res.json(err));
  } else {
    addBookingTypes (req, res)
    }
}

addBookingTypes = (req, res) => {
  console.log('<<<<<<<<<<<<<<<<<<<<<< addBookingTypes >>>>>>>>>>>>>>>>>>>>')
  bookingTypesModel
    .create({
      profile: req.body.profile,
      duration: req.body.duration,
      price: req.body.price,
    })
    .then(booking => {
      res.locals.booking = booking
      res.status(200).json(booking)
    })
    .catch(err => {
      res.status(401).json({ msg: 'An error ocurred trying to create booking types', err })
    })
}

exports.deleteBookingTypeById = (req, res) => {
  bookingTypesModel
    .findByIdAndDelete(req.params.id)
    .then(bookingTypes => {
      // res.status(200).send(bookingTypes + ' has been deleted');
      console.log('borrado')
    })
    res.status(401).json({ msg: 'An error ocurred trying to delete booking types' })
};
