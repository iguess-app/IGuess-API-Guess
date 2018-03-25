'use strict'

const Promise = require('bluebird')

const { getPredictionsRepository } = require('../../../repositories')

const getUsersPredictionsAndSetPontuations = (matches) => {

  const matchDayPredictionArrayPromise = matches.map((matchObj) => {
    const cursor = getPredictionsRepository.getPredictionByMatchRef(matchObj)
    return {
      cursor,
      match: matchObj
    }
  })

  return Promise.map(matchDayPredictionArrayPromise, (cursors) => cursors)
}


module.exports = getUsersPredictionsAndSetPontuations