'use strict'

const Promise = require('bluebird')
const { dateManager, log } = require('iguess-api-coincidents').Managers

const Prediction = require('../../models/guessDB/predictionsModel')

const setPredictions = (request) => {

  const setPredictionsPromiseArray = request.guesses.map((guess) => {
    const searchQuery = {
      matchUserRef: `${guess.matchRef}_${request.userRef}`
    }

    return Prediction.findOne(searchQuery)
      .then((matchPredictionFound) => {
        if (matchPredictionFound) {
          matchPredictionFound.guess.homeTeamScoreGuess = guess.homeTeamScoreGuess
          matchPredictionFound.guess.awayTeamScoreGuess = guess.awayTeamScoreGuess
          matchPredictionFound.matchInitTime = guess.initTime
          matchPredictionFound.predictionSentDate = dateManager.getUTCNow()

          return matchPredictionFound.save()
        }

        const newMatchPrediction = {
          matchUserRef: `${guess.matchRef}_${request.userRef}`,
          userRef: request.userRef,
          matchRef: guess.matchRef,
          championshipRef: request.championshipRef,
          matchInitTime: guess.initTime,
          predictionSentDate: dateManager.getUTCNow(),
          guess: {
            homeTeamScoreGuess: guess.homeTeamScoreGuess,
            awayTeamScoreGuess: guess.awayTeamScoreGuess
          }
        }

        return Prediction.create(newMatchPrediction)
      })
      .then((prediction) => prediction.toJSON())
      .catch((err) => {
        log.error(err)
      })
  })

  return Promise.map(setPredictionsPromiseArray,
    (prediction) => ({
      matchRef: prediction.matchRef,
      prediction: prediction.guess
    }))
    .then((predictionArraySetted) => _buildResponseBody(predictionArraySetted, request))
}

const _buildResponseBody = (predictionArraySetted, request) => ({
    predictions: predictionArraySetted,
    alertMessage: request.alertMessage ? request.alertMessage : ''
  })

module.exports = setPredictions