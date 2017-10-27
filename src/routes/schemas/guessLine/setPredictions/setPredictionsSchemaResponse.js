'use strict'

const Joi = require('joi')

const setPredictionsSchemaResponse = Joi.array().items(Joi.object({
  matchRef: Joi.string().required(),
  prediction: Joi.object({
    homeTeamScoreGuess: Joi.number().required(),
    awayTeamScoreGuess: Joi.number().required()
  })
}))

module.exports = setPredictionsSchemaResponse