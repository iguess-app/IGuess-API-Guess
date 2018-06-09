'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const teamEmbeddedSchema = require('../team/teamEmbeddedSchema')
const championshipEmbeddedSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')
const { pageAliases } = require('../../../../../config')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize
const MIN_POSSIBLE_SCORE = Config.guess.minPossibleScore
const UTC_TIMEZONE = 'UTC'

const defaultNextNearMatchDaySchema = Joi.object({
  championshipRef: Joi.string().length(ID_SIZE),
  userTimezone: Joi.string().default(UTC_TIMEZONE)
})

const pageAliasesList = Object.values(pageAliases)
const paginatedMatchDaySchema = Joi.object({
  championshipRef: Joi.string().length(ID_SIZE),
  userTimezone: Joi.string().default(UTC_TIMEZONE),
  page: Joi.string().valid([pageAliasesList]).required(),
  dateReference: Joi.date().required()
})

const request = Joi.alternatives().try(
  defaultNextNearMatchDaySchema,
  paginatedMatchDaySchema
)

const response = Joi.object({
  matchDayIsoDate: Joi.date().required(),
  matchDayHumanified: Joi.object({
    mainInfoDate: Joi.string().required(),
    subInfoDate: Joi.string().required()
  }).required(),
  championship: championshipEmbeddedSchema,
  hasPastMatchDays: Joi.bool().required(),
  guessLinePontuation: Joi.number().integer().required(),
  matchDayPontuation: Joi.number().integer().required(),
  games: Joi.array().items({
    initTimeIsoDate: Joi.date().required(),
    initTimeHumanified: Joi.string().required(),
    allowToPredict: Joi.bool().required(),
    minutes: Joi.string(),
    percentageCompleted: Joi.number(),
    started: Joi.bool().required(),
    ended: Joi.bool().required(),
    matchRef: Joi.string().required(),
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