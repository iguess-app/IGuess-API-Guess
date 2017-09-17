'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const fixtureSchema = require('../fixture/fixtureSchema')(app)

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize
  const MIN_POSSIBLE_SCORE = Config.guess.minPossibleScore

  const setPredictionsSchemaPayload = Joi.object({
    championshipRef: Joi.string().length(ID_SIZE).required(),
    fixture: fixtureSchema.required(),
    userRef: Joi.string().max(ID_SIZE).required(),
    guesses: Joi.array().items({
      matchRef: Joi.string().length(ID_SIZE).required(),
      homeTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required(),
      awayTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required()
    }).required()
  })

  return setPredictionsSchemaPayload
}

/*eslint global-require: 0*/