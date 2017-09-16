'use strict'

const calculatePontuations = require('./calculatePontuationsFunction')
const saveUserPontuation = require('./saveUserPontuation')

const compareScoreWithPrediction = (predictionsCursorAndFixtureObj, pontuationRules, models) => {
  const predictionsCursor = predictionsCursorAndFixtureObj.predictionsCursor
  const fixture = predictionsCursorAndFixtureObj.fixture

  predictionsCursor.on('data', (userPredictions) => {
    let fixturePontuation = 0
    fixture.games.forEach((game) => {
      userPredictions.guesses.map((guess) => {
        if (game._id === guess.matchRef) {
          guess.pontuation = calculatePontuations(game, guess, pontuationRules)
          fixturePontuation += guess.pontuation
        }

        return guess
      })
    })
    userPredictions.fixturePontuation = fixturePontuation
    userPredictions.save()
    
    saveUserPontuation(fixturePontuation, userPredictions, fixture, models.pontuationsModel)
  })
}

module.exports = compareScoreWithPrediction