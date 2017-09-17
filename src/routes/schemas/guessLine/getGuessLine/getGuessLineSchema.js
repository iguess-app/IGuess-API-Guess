'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const fixtureSchema = require('../fixture/fixtureSchema')(app)
  const teamEmbeddedSchema = require('../team/teamEmbeddedSchema')(app)

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize
  const MIN_POSSIBLE_SCORE = Config.guess.minPossibleScore

  const request = Joi.object({
    userRef: Joi.string().length(ID_SIZE).required(),
    championshipRef: Joi.string().length(ID_SIZE),
    fixture: fixtureSchema
  })

  const response = Joi.object({
    championshipRef: Joi.string().length(ID_SIZE).required(),
    guessLinePontuation: Joi.number().integer().required(),
    fixturePontuation: Joi.number().integer().required(),
    fixture: fixtureSchema.required(),
    fixtureNumber: Joi.number().integer(),
    ended: Joi.bool().required(),
    started: Joi.bool().required(),
    games: Joi.array().items({
      _id: Joi.string().length(ID_SIZE).required(),
      gamePontuation: Joi.number().integer(),
      stadium: Joi.string(),
      homeTeamScore: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required(),
      awayTeamScore: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required(),
      homeTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required(),
      awayTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer().required(),
      homeTeam: teamEmbeddedSchema.required(),
      awayTeam: teamEmbeddedSchema.required()
    }).required()
  })

  return {
    request,
    response
  }
}

/*eslint global-require: 0*/