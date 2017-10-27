'use strict'

const moment = require('moment')

const Round = require('../../../../../src/models/holiDB/roundModel')

const updateMatchInitTimeToPredictionGoWell = () => 
  Round.findById('59d1475c70dc031ae0973f54')
  .then((matchDay) => {
    const fakeMatchInitTimeAcceptedByTheRule = moment().add('2', 'hour').format()
    matchDay.games.map((match) => {
      match.initTime = fakeMatchInitTimeAcceptedByTheRule
      return match
    })
    return matchDay.save()
  })

module.exports = updateMatchInitTimeToPredictionGoWell