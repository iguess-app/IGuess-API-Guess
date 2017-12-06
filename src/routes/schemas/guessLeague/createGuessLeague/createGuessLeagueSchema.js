'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const championshipEmbeddedSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  guessLeagueName: Joi.string().required(),
  championshipRef: Joi.string().length(ID_SIZE).required(),
  userRefInviteads: Joi.array().items(
    Joi.string().length(ID_SIZE)
  ).required()
})

const response = Joi.object({
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