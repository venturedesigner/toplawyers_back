const { userModel } = require('../models/user.model')
const { calendarModel } = require('../models/calendar.model')
const { overwriteModel } = require('../models/overwrite.model')
const { bookingModel } = require('../models/booking.model')

const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)

exports.createCalendar = (req, res) => {
  let UserID = ''
  if (res.locals.user.typeofuser === 'Admin' && req.body.user_id.length > 0) {
    UserID = req.body.user_id
  } else {
    UserID = res.locals.user._id
  }
  calendarModel
    .create({
      user_id: UserID,
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      overwrite: []
    })
    .then(calendar => {
      userModel
        .findById(UserID)
        .then(user => {
          if (user.calendar) {
            res.status(401).json({ msg: 'User already has a calendar created' })
          } else {
            user.calendar = calendar._id
            user.save()
              .then(saved => {
                res.status(200).json(user)
              })
              .catch(err => {
                res.status(401).json({ msg: 'An error ocurred trying to add calendar id to user', err })
              })
          }
        })
        .catch(err => {
          res.status(401).json({ msg: 'An error ocurred trying to create calendar', err })
        })
    })
    .catch(err => {
      res.status(400).json({ error: 'Error creating calendar', err })
    })
}

exports.getMyCalendar = (req, res) => {
  calendarModel
    .findOne({ user_id: res.locals.user._id })
    .then(calendar => {
      res.status(200).json(calendar)
    })
    .catch(err => {
      res.status(500).json({ msg: 'An error ocurred trying to save calendar info', err })
    })
}

exports.updateMyCalendar = (req, res) => {
  calendarModel
    .findOneAndUpdate({ user_id: res.locals.user._id }, req.body, { new: true })
    .then(calendar => {
      res.locals.calendar = calendar
      // console.log('----> Update calendar')
      res.status(200).json(calendar)
    })
    .catch(err => {
      res.status(500).json({ msg: 'An error ocurred trying to save your calendar info', err })
    })
}

exports.updateCalendar = (req, res) => {
  calendarModel
    .findById(req.params.calendarId)
    .then(calendar => {
      if (calendar.user_id.equals(res.locals.user._id) || res.locals.user.typeofuser === 'Admin') {
        calendarModel
          .findOneAndUpdate({ _id: req.params.calendarId }, req.body, { new: true })
          .then(calendar2 => {
            res.locals.calendar = calendar2
            // console.log('----> Update calendar')
            res.status(200).json(calendar2)
          })
          .catch(err => {
            res.status(500).json({ msg: 'An error ocurred trying to save calendar info', err })
          })
      } else {
        res.status(403).json({ msg: 'You are trying to update someone else calendar' })
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'An error ocurred trying to save calendar info', err })
    })
}

// // Get blocks by Week. Taking into account overwrites and bookings.
exports.getBlocksByWeek = async (req, res) => {
  const userId = req.params.userId // proffesional
  const week = req.params.week // "0" is current week
  const today = await new Date()
  const lastMonday = today.setDate(today.getDate() - (today.getDay() - 1))
  const lastMondayS = dayjs(lastMonday).set('hour', 0).set('minute', 0).set('second', 0)
  // console.log('--> Monday', dayjs(lastMondayS).format('YYYY-MM-DDTHH:mm:ssZ[Z]'))
  const nextSunday = dayjs(lastMondayS).add(7, 'day').subtract(1, 'minute')
  // console.log('--> Sunday', dayjs(nextSunday).format('YYYY-MM-DDTHH:mm:ssZ[Z]'))
  const blocksAdd = []

  try {
    // 1. Traigo el calendario (Strings)
    const calendar = await calendarModel
      .findOne({ user_id: userId })
    // console.log('--> calendar', calendar)

    // 2. Contruyo un array de objetos con fechas con base en el calendario para esa semana
    for (let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
      calendar[dayOfWeek].forEach(block => {
        // console.log('--> blockr', block)
        const start = new Date(lastMondayS)
        start.setDate(start.getDate() + week * 7 + (dayOfWeek + 7 - start.getDay()) % 7)
        start.setHours(block.start.slice(0, 2), block.start.slice(3), 0, 0)

        const end = new Date(lastMondayS)
        end.setDate(end.getDate() + week * 7 + (dayOfWeek + 7 - end.getDay()) % 7)
        end.setHours(block.end.slice(0, 2), block.start.slice(3), 0, 0)

        const newBlock = {
          // user_id: userId,
          start: start,
          end: end
        }
        blocksAdd.push(newBlock)
      })
    }

    // ordeno lso bloques
    const orderedBlocks = blocksAdd.sort(function (a, b) {
      return a.start - b.start
    })
    // console.log(orderedBlocks)

    // 3. user.overwrites(filtrado por fechas de la semana) --> Sobrescribo las fechas que hayan overwrites.

    // 3a) Borro los bloques de la fechas donde hay overwrites
    const monday = dayjs(lastMondayS).add((7 * week), 'day')
    const sunday = dayjs(monday).add(7, 'day').subtract(1, 'minute')
    // console.log('-->', monday, sunday)

    const weekOverwrites = await overwriteModel
      .find({ date: { $gte: monday, $lte: sunday }, user_id: userId })

    // console.log('--> orderedBlocks', orderedBlocks.length, orderedBlocks)
    let filtered = [...orderedBlocks]
    if (weekOverwrites.length > 0) {
      for (let i = 0; i < weekOverwrites.length; i++) {
        const startDelete = weekOverwrites[i].date
        const endDelete = new Date(startDelete)
        endDelete.setDate(endDelete.getDate() + 1)

        const filteredItems = filtered.filter(function (block) {
          if (dayjs(block.start).isBetween(dayjs(startDelete), dayjs(endDelete))) {
            return false
          } else {
            return true
          }
        })

        filtered = []
        filtered = [...filteredItems]

        // 3b) Creo los bloques introducidos en cada overwrite
        const newBlocks = weekOverwrites[i].blocks
        newBlocks.forEach(block => {
          const newBlock = {
            // user_id: userId,
            start: dayjs(block.start).toDate(),
            end: dayjs(block.end).toDate()
          }
          filtered.push(newBlock)
        })
      }
    }
    // console.log('--> filtered', filtered.length, filtered)

    // 4. user.bookings(filtrado por las fechas de la semana) --> Sobrescribo los bloques correspondientes.
    const weekBookings = await bookingModel
      .find({ startBook: { $gte: monday, $lte: sunday }, professional_id: userId })

    // console.log('--> weekBookings', weekBookings)
    let finalBlocks = [...filtered]
    // console.log('--> finalBlocks', finalBlocks)
    if (weekBookings.length > 0) {
      for (let i = 0; i < weekBookings.length; i++) {
        const startBook = new Date(weekBookings[i].startBook)
        const endBook = new Date(weekBookings[i].endBook)
        // console.log('--> startBook', startBook)
        // console.log('--> endBook', endBook)

        const filteredBlock = finalBlocks.filter(function (block) {
          if (dayjs(block.start).isSameOrBefore(dayjs(startBook)) && dayjs(block.end).isSameOrAfter(dayjs(endBook))) {
            return true
          } else {
            return false
          }
        })
        // console.log('--> filteredBlock', filteredBlock[0])

        const startBlock = new Date(filteredBlock[0].start)
        const endBlock = new Date(filteredBlock[0].end)
        // console.log('--> StartBlock', startBlock, endBlock)

        if (startBlock < startBook && endBlock > endBook) {
          // console.log('Es en la mitad')
          const allExceptFiltered = finalBlocks.filter(function (block) {
            if (dayjs(block.start).isSameOrBefore(dayjs(startBook)) && dayjs(block.end).isSameOrAfter(dayjs(endBook))) {
              return false
            } else {
              return true
            }
          })
          const newBlock1 = {
            start: dayjs(filteredBlock[0].start).toDate(),
            end: dayjs(startBook).toDate()
          }
          const newBlock2 = {
            start: dayjs(endBook).toDate(),
            end: dayjs(filteredBlock[0].end).toDate()
          }

          finalBlocks = []
          for (let i = 0; i < allExceptFiltered.length; i++) {
            finalBlocks.push(allExceptFiltered[i])
          }
          finalBlocks.push(newBlock1)
          finalBlocks.push(newBlock2)

          // n
        } else if (endBlock > endBook) {
          // console.log('Es comenzando')
          const allExceptFiltered = finalBlocks.filter(function (block) {
            if (dayjs(block.start).isSameOrBefore(dayjs(startBook)) && dayjs(block.end).isSameOrAfter(dayjs(endBook))) {
              return false
            } else {
              return true
            }
          })
          const newBlock3 = {
            start: dayjs(endBook).toDate(),
            end: dayjs(filteredBlock[0].end).toDate()
          }

          finalBlocks = []
          for (let i = 0; i < allExceptFiltered.length; i++) {
            finalBlocks.push(allExceptFiltered[i])
          }
          finalBlocks.push(newBlock3)

          // n
        } else if (startBlock < startBook) {
          // console.log('Es terminando')
          const allExceptFiltered = finalBlocks.filter(function (block) {
            if (dayjs(block.start).isSameOrBefore(dayjs(startBook)) && dayjs(block.end).isSameOrAfter(dayjs(endBook))) {
              return false
            } else {
              return true
            }
          })
          const newBlock4 = {
            start: dayjs(filteredBlock[0].start).toDate(),
            end: dayjs(startBook).toDate()
          }

          finalBlocks = []
          for (let i = 0; i < allExceptFiltered.length; i++) {
            finalBlocks.push(allExceptFiltered[i])
          }
          finalBlocks.push(newBlock4)

          // n
        }
      }
    }

    // ordeno lso bloques
    const orderedFinalBlocks = finalBlocks.sort(function (a, b) {
      return a.start - b.start
    })

    res.status(200).json(orderedFinalBlocks)
  } catch (err) {
    res.status(500).json({ msg: 'An error ocurred getting weekly availability', err })
  }

  // 5. envío una respuesta con la disponibilidad de la semana
}
