const mongoose = require('mongoose')

// const timesOfDay = [0, 15, 30, 45, 100, 115, 130, 145, 200, 215, 230, 245, 300, 315, 330, 345, 400, 415, 430, 445, 500, 515, 530, 545, 600, 615, 630, 645, 700, 715, 730, 745, 800, 815, 830, 845, 900, 915, 930, 945, 1000, 1015, 1030, 1045, 1100, 1115, 1130, 1145, 1200, 1215, 1230, 1245, 1300, 1315, 1330, 1345, 1400, 1415, 1430, 1445, 1500, 1515, 1530, 1545, 1600, 1615, 1630, 1645, 1700, 1715, 1730, 1745, 1800, 1815, 1830, 1845, 1900, 1915, 1930, 1945, 2000, 2015, 2030, 2045, 2100, 2115, 2130, 2145, 2200, 2215, 2230, 2245, 2300, 2315, 2330, 2345]

const calendarSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: [true, 'This user already has a calendar']
  },
  1: [{ // monday
    start: {
      type: String
    },
    end: {
      type: String
    }
  }],
  2: [{
    start: {
      type: String
    },
    end: {
      type: String
    }
  }],
  3: [{
    start: {
      type: String
    },
    end: {
      type: String
    }
  }],
  4: [{
    start: {
      type: String
    },
    end: {
      type: String
    }
  }],
  5: [{
    start: {
      type: String
    },
    end: {
      type: String
    }
  }],
  6: [{
    start: {
      type: String
    },
    end: {
      type: String
    }
  }],
  7: [{
    start: {
      type: String
    },
    end: {
      type: String
    }
  }]
})

exports.calendarModel = mongoose.model('Calendar', calendarSchema)
