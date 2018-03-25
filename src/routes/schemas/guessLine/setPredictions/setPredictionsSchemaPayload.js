'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize
const MIN_POSSIBLE_SCORE = Config.guess.minPossibleScore

const setPredictionsSchemaPayload = Joi.object({
  championshipRef: Joi.string().length(ID_SIZE).required(),
  guesses: Joi.array().items({
    matchRef: Joi.string().required(),
    homeTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required(),
    awayTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required()
  }).required()
})

module.exports = setPredictionsSchemaPayload