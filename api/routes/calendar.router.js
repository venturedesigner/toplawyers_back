const { checkAuth } = require('../../utils')

const {
  createCalendar,
  updateCalendar,
  updateMyCalendar,
  getMyCalendar,
  getBlocksByWeek
} = require('../controllers/calendar.controller')

const router = require('express').Router()

router.get('/current', checkAuth, getMyCalendar)
router.get('/:userId/week/:week', getBlocksByWeek)
router.post('/', checkAuth, createCalendar)
router.post('/current', checkAuth, updateMyCalendar)
router.post('/:calendarId', checkAuth, updateCalendar)

exports.calendarRouter = router
