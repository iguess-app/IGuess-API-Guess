'use strict'

const Promise = require('bluebird')

const { getPredictionsRepository } = require('../../../repositories')

const getUsersPredictionsAndSetPontuations = (matchDay) => {

  const matchDayPredictionArrayPromise = matchDay.games.map((matchObj) => {
    const cursor = getPredictionsRepository.getPredictionByMatchRef(matchObj)
    return {
      cursor,
      match: matchObj,
      matchDateUnixDate: matchDay.unixDate
    }
  })

  return Promise.map(matchDayPredictionArrayPromise, (cursors) => cursors)
}


module.exports = getUsersPredictionsAndSetPontuations