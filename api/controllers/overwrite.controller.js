const { overwriteModel } = require('../models/overwrite.model')
const { userModel } = require('../models/user.model')

exports.newOverwrite = (req, res) => {
  const newOverwrite = {
    user_id: res.locals.user._id,
    date: new Date(Date.UTC(req.body.year, (req.body.month - 1), req.body.day)),
    blocks: []
  }
  console.log('newOverwrite -->', newOverwrite)
  const blocks = req.body.blocks
  blocks.forEach(block => {
    newOverwrite.blocks.push(block)
  })
  console.log('--> newOverwrite', newOverwrite)

  overwriteModel
    .deleteOne({ date: newOverwrite.date, user_id: res.locals.user._id })
    .then(() => {
      overwriteModel
        .create(newOverwrite)
        .then(overwrite => {
          // res.status(201).json({ overwrite })
          res.locals.overwrite = overwrite
          userModel
            .findById(res.locals.user._id)
            .then(user => {
              console.log('--> user44', user)
                user.overwrites.push(overwrite)
              user.save()
                .then(() => {
                  res.status(200).json(overwrite)
                })
            })
        })
        .catch(err => {
          res.status(500).json({ msg: 'An error ocurred trying to save overwrite', err })
        })
    })
}

exports.getMyOverwrites = (req, res) => {
  overwriteModel
    .find({user_id: res.locals.user._id })
    .then(overwrites => {
      res.status(200).json(overwrites)
    })
    .catch(err => {
      res.status(500).json({ msg: 'An error ocurred retrieving your overwrites', err })
    })

}