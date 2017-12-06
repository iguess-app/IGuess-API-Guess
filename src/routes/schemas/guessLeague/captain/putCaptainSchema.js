'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  guessLeagueRef: Joi.string().length(ID_SIZE).required(),
  userRefToCaptain: Joi.string().length(ID_SIZE).required()
})

const response = Joi.object({
  newCaptainSetted: Joi.bool().required()
})
module.exports = {
  request,
  response
}