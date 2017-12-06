'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  userRefInviteads: Joi.array().items(
    Joi.string().length(ID_SIZE)
  ).required(),
  guessLeagueRef: Joi.string().required().length(ID_SIZE),
  championshipRef: Joi.string().required().length(ID_SIZE)
})
const response = Joi.object({
  inviteads: Joi.array().items(
    Joi.string().required().length(ID_SIZE)
  )
})

module.exports = {
  request,
  response
}