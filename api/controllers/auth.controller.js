const { userModel } = require('../models/user.model')
const { profileModel } = require('../models/profile.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.json({ error: 'Wrong ' })
      }
      bcrypt.compare(req.body.password, user.password,
        (err, result) => {
          if (!result) {
            return res.status(401).json({ error: 'Wrong email or password', err })
          }
          const userData = {
            username: user.username,
            email: user.email,
            id: user._id,
            typeofuser: user.typeofuser
          }
          const token = jwt.sign(
            userData,
            process.env.SECRET,
            { expiresIn: '1h' }
          )

          return res.status(200).json({ token: token, ...userData })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'Error' })
    })
}

exports.signUp = async (req, res) => { // Automatically create a profile and add it to user
  const hashedPwd = bcrypt.hashSync(req.body.password, 10)
  userModel
    .create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: res.locals.username,
      password: hashedPwd,
      email: req.body.email,
      // dateofbirth: req.body.dateofbirth,
      typeofuser: 'User'
    })
    .then(user => {
      const userData = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: res.locals.username,
        id: user._id,
        email: user.email,
        typeofuser: user.typeofuser
      }
      const token = jwt.sign(
        userData,
        process.env.SECRET,
        { expiresIn: '48h' }
      )
      profileModel
        .create({
          user_id: user._id,
          name: user.firstname + ' ' + user.lastname
        })
        .then(profile => {
          user.profile = profile._id
          user.save()
            .then(saved => {
              res.status(200).json(res.locals.user)
            })
            .catch(err => {
              res.status(401).json({ msg: 'An error ocurred trying to add profile id to user', err })
            })
        })
        .catch(err => {
          res.status(401).json({ msg: 'An error ocurred trying to create profile', err })
        })
      res.status(201).json({ token: token, ...userData })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: 'Error creating account' })
    })
}

exports.logout = (req, res) => {
  console.log('Logged out sucessfully')
  return res.status(200).send('Logged out sucessfully')
}

// async function makeid (n) {
//   let result = ''
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   const charactersLength = characters.length
//   for (let i = 0; i < n; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength))
//   }
//   console.log('-->', result)
//   return result

//   // userModel
//   //   .findOne({ username: result })
//   //   .then(user => {
//   //     console.log('entro77')
//   //     if (user === null) {
//   //       console.log('Username is available', result)
//   //       return result
//   //     } else {
//   //       console.log(result, 'Username is taken')
//   //     }
//   //   })
//   //   .catch(err => {
//   //     console.log(err)
//   //   })
// }
