'use strict'

const calculatePontuations = require('./calculatePontuationsFunction')
const saveUserPontuation = require('./saveUserPontuation')

const compareScoreWithPrediction = (predictionsCursorAndFixtureObj) => {
  const predictionsCursor = predictionsCursorAndFixtureObj.predictionsCursor
  const fixture = predictionsCursorAndFixtureObj.fixture

  predictionsCursor.on('data', (userPredictions) => {
    let fixturePontuation = 0
    fixture.games.forEach((game) => {
      userPredictions.guesses.map((guess) => {
        if (game._id === guess.matchRef) {
          guess.pontuation = calculatePontuations(game, guess)
          fixturePontuation += guess.pontuation
        }

        return guess
      })
    })
    userPredictions.fixturePontuation = fixturePontuation
    userPredictions.save()
    
    saveUserPontuation(fixturePontuation, userPredictions, fixture)
  })
}

module.exports = compareScoreWithPrediction