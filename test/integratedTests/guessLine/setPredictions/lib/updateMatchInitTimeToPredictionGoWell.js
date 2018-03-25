'use strict'

const moment = require('moment')

const Match = require('../../../../../src/models/holiDB/matchModel')

const updateMatchInitTimeToPredictionGoWell = () => 
  Match.findOne({matchRef: 'OneHourLessRef'})
    .then((match) => {
      const fakeMatchInitTimeNotAcceptedByTheRule = moment().subtract('30', 'minutes').format()
      match.initTime = fakeMatchInitTimeNotAcceptedByTheRule

      return match.save()
    })

module.exports = updateMatchInitTimeToPredictionGoWell