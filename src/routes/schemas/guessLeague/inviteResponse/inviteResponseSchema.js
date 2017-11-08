'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  userRef: Joi.string().required().length(ID_SIZE),
  guessLeagueRef: Joi.string().required().length(ID_SIZE),
  championshipRef: Joi.string().required().length(ID_SIZE),
  response: Joi.bool().required()
}).meta({
  className: 'Request'
})

const response = Joi.object({
  invitationResponded: Joi.bool().required(),
  userAddedToGuessLeague: Joi.bool().required()
}).meta({
  className: 'Response'
})

module.exports = {
  request,
  response
}