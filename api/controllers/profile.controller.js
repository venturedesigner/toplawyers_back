const { profileModel } = require('../models/profile.model')

exports.updateProfile = (req, res) => {
  profileModel
    .findById(req.params.profileId)
    .then(profile => {
      if (profile.user_id.equals(res.locals.user._id)) {
        console.log('They are equals')
        if (req.body.profilepic) { profile.profilepic = req.body.profilepic }
        if (req.body.profilevideo) { profile.profilevideo = req.body.profilevideo }
        if (req.body.description) { profile.description = req.body.description }
        if (req.body.languages) { profile.languages = req.body.languages }
        if (req.body.skills) { profile.skills = req.body.skills }
        if (req.body.education) { profile.education = req.body.education }
        if (req.body.experience) { profile.experience = req.body.experience }
        if (req.body.linkedin) { profile.linkedin = req.body.linkedin }
        if (req.body.twitter) { profile.twitter = req.body.twitter }
        if (req.body.github) { profile.github = req.body.github }
        if (req.body.tiktok) { profile.tiktok = req.body.tiktok }
        if (req.body.instagram) { profile.instagram = req.body.instagram }

        res.locals.profile = profile

        profile.save()
          .then(saved => {
            res.status(200).json(res.locals.profile)
          })
          .catch(err => {
            res.status(401).json({ msg: 'An error ocurred trying to save profile info', err })
          })
      } else {
        res.status(401).json({ msg: 'Sorry, you can only update your profile' })
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'An error ocurred trying to update a profile', err })
    })
}

exports.getAllProfiles = (req, res) => {
  profileModel
    .find()
    .populate({ path: 'user_id', select: 'avatar' })
    .select('name description skills education experience profilevideo')
    .then(profiles => {
      console.log(profiles)
      res.status(200).json(profiles)
    })
    .catch(err => console.error('Error getting all profile', err))
}