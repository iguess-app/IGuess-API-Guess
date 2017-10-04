'use strict'

const Prediction = require('../../../models/guessDB/predictionsModel')

const getUsersPredictionsAndSetPontuations = (fixture) => {
  const predictionsCursor = _getPredictions(fixture)

  return {
    predictionsCursor,
    fixture
  }
}

const _getPredictions = (fixture) => {
  const searchQuery = {
    'championshipFixtureUserKey': {
      '$regex': `${fixture.championshipRef}_${fixture.fixture}`
    }
  }

  return Prediction.find(searchQuery).cursor()
}


module.exports = getUsersPredictionsAndSetPontuations