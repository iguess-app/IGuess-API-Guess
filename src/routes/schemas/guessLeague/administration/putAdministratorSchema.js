'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  guessLeagueRef: Joi.string().length(ID_SIZE).required(),
  userRef: Joi.string().length(ID_SIZE).required(),
  userRefToAdm: Joi.string().length(ID_SIZE).required()
}).meta({
  className: 'Request'
})

const response = Joi.object({}).unknown().meta({
  className: 'Response'
})

module.exports = {
  request,
  response
}