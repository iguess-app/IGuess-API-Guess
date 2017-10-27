'use strict'

const moment = require('moment')
const Promise = require('bluebird')
const Log = require('iguess-api-coincidents').Managers.logManager

const Prediction = require('../../models/guessDB/predictionsModel')

const setPredictions = (request, dictionary) => {

  const setPredictionsPromiseArray = request.guesses.map((guess) => {
    const searchQuery = {
      matchUserRef: `${guess.matchRef}_${request.userRef}`
    }

    return Prediction.findOne(searchQuery)
      .then((matchPredictionFound) => {
        if (matchPredictionFound) {
          matchPredictionFound.guess.homeTeamScoreGuess = guess.homeTeamScoreGuess
          matchPredictionFound.guess.awayTeamScoreGuess = guess.awayTeamScoreGuess
          matchPredictionFound.matchInitTime = guess.initTimeUnixDate
          matchPredictionFound.predictionSentDate = moment().format()

          return matchPredictionFound.save()
        }

        const newMatchPrediction = {
          matchUserRef: `${guess.matchRef}_${request.userRef}`,
          userRef: request.userRef,
          matchRef: guess.matchRef,
          championshipRef: request.championshipRef,
          matchInitTime: guess.initTimeUnixDate,
          predictionSentDate: moment().format(),
          guess: {
            homeTeamScoreGuess: guess.homeTeamScoreGuess,
            awayTeamScoreGuess: guess.awayTeamScoreGuess
          }
        }

        return Prediction.create(newMatchPrediction)
      })
      .then((prediction) => prediction.toJSON())
      .catch((err) => {
        Log.error(err)
      })
  })

  return Promise.map(setPredictionsPromiseArray,
    (prediction) => ({
      matchRef: prediction.matchRef,
      prediction: prediction.guess
    }))
}

module.exports = setPredictions

//TODO: Mesmo que uma prediction falhar, fazer as outras darem certo