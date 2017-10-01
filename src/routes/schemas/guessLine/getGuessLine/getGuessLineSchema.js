'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const fixtureSchema = require('../fixture/fixtureSchema')
const teamEmbeddedSchema = require('../team/teamEmbeddedSchema')

const Config = coincidents.Config
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
    homeTeamScore: Joi.number().min(MIN_POSSIBLE_SCORE).integer(),
    awayTeamScore: Joi.number().min(MIN_POSSIBLE_SCORE).integer(),
    homeTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer(),
    awayTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer(),
    homeTeam: teamEmbeddedSchema.required(),
    awayTeam: teamEmbeddedSchema.required()
  }).required()
})

module.exports = {
  request,
  response
}