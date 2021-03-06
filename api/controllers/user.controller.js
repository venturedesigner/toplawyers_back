const { userModel } = require('../models/user.model')

exports.getUsers = (req, res) => {
  userModel
    .find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => console.error('Error getting all users', err))
}

exports.updateUser = (req, res) => {
  userModel
    .findById(res.locals.user._id)
    .then(user => {
      if (req.body.supportlang) { user.supportlang = req.body.supportlang }
      if (req.body.phone) { user.phone = req.body.phone }
      if (req.body.countryorigin) { user.countryorigin = req.body.countryorigin }
      if (req.body.dateofbirth) { user.dateofbirth = req.body.dateofbirth }

      res.locals.user = user
      user.save()
        .then(saved => {
          res.status(200).json(res.locals.user)
        })
        .catch(err => {
          res.status(401).json({ msg: 'An error ocurred trying to update user info', err })
        })
    })
    .catch(err => {
      res.status(500).json({ msg: 'An error ocurred trying to find user', err })
    })
}

// exports.getProfile = (req, res) => {
//   userModel
//     .findById(req.params.userId)
//     .then(user => {
//       res.status(200).json(user.profile)
//     })
//     .catch(err => console.error('Error getting profile', err))
// }

// exports.getMyChannels = (req, res) => {
//   userModel
//     .findById(res.locals.user._id)
//     .populate('mychannels')
//     .then(user => {
//       res.status(200).json(user.mychannels)
//     })
//     .catch(err => {
//       res.status(500).json({ msg: 'Error getting all channels', err })
//     })
// }

// exports.createProfile = (req, res) => {
//   res.locals.user.profile = req.body
//   res.locals.user
//     .save()
//     .then(user => {
//       res.status(201).json(user)
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(400).json({ error: 'Error' })
//     })
// }

// exports.updateRoleRequestInfo = (req, res) => {
//   res.locals.user.creatorinfo = {
//     user_id: res.locals.user._id,
//     experience: req.body.experience,
//     skills: req.body.skills,
//     education: req.body.education
//   }
//   console.log(res.locals.user)
//   res.locals.user
//     .save()
//     .then(user => {
//       res.json(user)
//     })
//     .catch(err => console.error('Error when saving to "creatorinfo":\n', err))
// }

// exports.changeTypeOfUser = (req, res) => {
//   const newType = req.body.typeofuser
//   userModel
//     .findOneAndUpdate(
//       { email: req.body.email },
//       {
//         typeofuser: newType
//       }, { new: true, useFindAndModify: false })
//     .then(user => {
//       res.status(201).send('New type of User: ' + newType + ' assigned to ' + user.name)
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({ error: 'Error making a moderator' })
//     })
// }

// exports.makeCreator = (req, res) => {
//   userModel
//     .findOneAndUpdate(
//       { email: req.body.email },
//       { typeofuser: 'Creator' },
//       { new: true, useFindAndModify: false }
//     )
//     .then(user => {
//       res.status(201).send('New creator: ' + user.name)
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({ error: 'Error making a creator' })
//     })
// }
