'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const MIN_POSSIBLE_SCORE = Config.guess.minPossibleScore

const setPredictionsSchemaResponse = Joi.object({
  predictions: Joi.array().items(Joi.object({
    matchRef: Joi.string().required(),
    prediction: Joi.object({
      homeTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required(),
      awayTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required()
    }).required()
  })).required(),
  alertMessage: Joi.string().allow('')
})

module.exports = setPredictionsSchemaResponse