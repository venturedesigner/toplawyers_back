// const jwt = require('jsonwebtoken')
const AccessToken = require('twilio').jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant

exports.getToken = (req, res) => {
  const identity = res.locals.user._id
  console.log('--> identity:', identity)
  // var identity = req.query['identity'];

  if (!identity) {
    return res.status(400).send({
      body: 'An identity is needed'
    })
  }

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_SID,
    process.env.TWILIO_API_SECRET
  )

  // Assign the generated identity to the token.
  token.identity = identity

  // Grant the access token Twilio Video capabilities.
  const grant = new VideoGrant({
    room: 'topdev'
  })
  token.addGrant(grant)

  // Serialize the token to a JWT string and include it in a JSON response.
  console.log(token.toJwt())

  res.status(200).send({
    identity: identity,
    token: token.toJwt()
  })
}
