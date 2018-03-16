'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const teamEmbeddedSchema = require('../team/teamEmbeddedSchema')
const championshipEmbeddedSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize
const MIN_POSSIBLE_SCORE = Config.guess.minPossibleScore

const request = Joi.object({
  championshipRef: Joi.string().length(ID_SIZE),
  page: Joi.string().valid(['previous', 'next', 'near']).default('near')
})

const response = Joi.object({
  date: Joi.string().required(),
  weekDay: Joi.string().required(),
  matchDayUnixDateIndicator: Joi.number().required(),
  championship: championshipEmbeddedSchema,
  guessLinePontuation: Joi.number().integer().required(),
  matchDayPontuation: Joi.number().integer().required(),
  games: Joi.array().items({
    initTime: Joi.date().required(),
    allowToPredict: Joi.bool().required(),
    minutes: Joi.string(),
    started: Joi.bool().required(),
    ended: Joi.bool().required(),
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