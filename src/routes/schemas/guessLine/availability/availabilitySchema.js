'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  userRef: Joi.string().length(ID_SIZE).required(),
  championshipRef: Joi.string().length(ID_SIZE).required()
})

const response = Joi.object({})

module.exports = {
  request,
  response
}