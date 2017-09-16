'use strict'

const getUsersPredictionsAndSetPontuations = (fixture, models, pontuationRules) => {
  const predictionsCursor = _getPredictions(fixture, models.predictionsModel)

  return {
    predictionsCursor,
    fixture
  }
}

const _getPredictions = (fixture, Predictions) => {
  const searchQuery = {
    'championshipFixtureUserKey': {
      '$regex': `${fixture.championshipRef}_${fixture.fixture}`
    }
  }

  return Predictions.find(searchQuery).cursor()
}


module.exports = getUsersPredictionsAndSetPontuations