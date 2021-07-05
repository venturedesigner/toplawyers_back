const jwt = require('jsonwebtoken')
const { userModel } = require('../api/models/user.model')

exports.checkAuth = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
    if (err) {
      console.log(err)
      res.status(403).json({ error: 'Token not valid' })
    } else {
      userModel
        .findOne({ email: token.email })
        .then(user => {
          if (user) {
            res.locals.user = user
            next()
          } else {
            res.status(400).json({ err: 'User not found' })
          }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ err: 'Issue in DB' })
        })
    }
  })
}

exports.isCreator = (req, res, next) => {
  if (res.locals.user.typeofuser === 'Creator' ||
  res.locals.user.typeofuser === 'Moderator' ||
  res.locals.user.typeofuser === 'Admin') {
    next()
  } else {
    res.status(400).json({ err: 'User is not creator' })
  }
}

exports.isModerator = (req, res, next) => {
  if (res.locals.user.typeofuser === 'Moderator' ||
  res.locals.user.typeofuser === 'Admin') {
    next()
  } else {
    res.status(400).json({ err: 'User is not a moderator' })
  }
}

exports.isAdmin = (req, res, next) => {
  if (res.locals.user.typeofuser === 'Admin') {
    next()
  } else {
    res.status(400).json({ err: 'User is not a admin' })
  }
}

exports.isSubscriber = (req, res, next) => {
  const idChannel = req.params.channelId
  if (res.locals.user.channelsfollowed.includes(idChannel)) {
    console.log('User is subcribed to channel')
    next()
  } else {
    res.status(400).json({ err: 'User is not a subscriber to this channel' })
  }
}

exports.uniqueUsername = async (req, res, next) => {
  let username = ''
  if (req.body.username) {
    username = req.body.username
  } else {
    username = await makeid(8)
  }

  userModel
    .findOne({ username: req.body.username })
    .then(user => {
      if (user === null) {
        console.log('Username is available')
        res.locals.username = username
        next()
      } else {
        console.log(user._id)
        res.status(401).json({ err: 'Username is taken' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: 'Server error validating username' })
    })
}

exports.uniqueEmail = (req, res, next) => {
  userModel
    .findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        console.log('email is available')
        res.locals.email = req.body.email
        next()
      } else {
        console.log(user.id)
        res.status(401).json({ err: 'email is taken' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: 'Server error validating email' })
    })
}

async function makeid (n) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < n; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
