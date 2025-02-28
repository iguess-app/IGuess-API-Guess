'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const championshipEmbeddedSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize
const MAX_GROUP_SIZE = Config.guess.maxGuessLeagueGroupNameSize

const request = Joi.object({
  guessLeagueRef: Joi.string().length(ID_SIZE),
  newName: Joi.string().max(MAX_GROUP_SIZE)
})

const response = Joi.object({
  _id: Joi.object().required(),
  guessLeagueName: Joi.string().required(),
  championship: championshipEmbeddedSchema.required().unknown(),
  inviteads: Joi.array().items(
    Joi.string().length(ID_SIZE)
  ),
  players: Joi.array().items(
    Joi.string().length(ID_SIZE).required()
  ),
  captains: Joi.array().items(
    Joi.string().length(ID_SIZE).required()
  )
}).unknown()

module.exports = {
  request,
  response
}