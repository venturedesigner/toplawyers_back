const { checkAuth } = require('../../utils')

const {
  newOverwrite,
  getMyOverwrites
} = require('../controllers/overwrite.controller')

const router = require('express').Router()

router.get('/current', checkAuth, getMyOverwrites)
router.post('/', checkAuth, newOverwrite)

exports.overwriteRouter = router
