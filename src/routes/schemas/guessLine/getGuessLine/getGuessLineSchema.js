'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const teamEmbeddedSchema = require('../team/teamEmbeddedSchema')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize
const MIN_POSSIBLE_SCORE = Config.guess.minPossibleScore

const request = Joi.object({
  userRef: Joi.string().length(ID_SIZE).required(),
  championshipRef: Joi.string().length(ID_SIZE)
})

const response = Joi.object({
  championshipRef: Joi.string().length(ID_SIZE).required(),
  guessLinePontuation: Joi.number().integer().required(),
  matchDayPontuation: Joi.number().integer().required(),
  games: Joi.array().items({
    matchRef: Joi.string().length(ID_SIZE).required(),
    matchPontuation: Joi.number().integer(),
    stadium: Joi.string(),
    homeTeamScore: Joi.number().min(MIN_POSSIBLE_SCORE).integer(),
    awayTeamScore: Joi.number().min(MIN_POSSIBLE_SCORE).integer(),
    homeTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer(),
    awayTeamScoreGuess: Joi.number().min(MIN_POSSIBLE_SCORE).integer(),
    homeTeam: teamEmbeddedSchema.required().unknown(),
    awayTeam: teamEmbeddedSchema.required().unknown()
  }).required()
})

module.exports = {
  request,
  response
}