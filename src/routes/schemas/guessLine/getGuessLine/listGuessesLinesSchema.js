'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  userRef: Joi.string().length(ID_SIZE).required(),
  onlyActive: Joi.bool().default(false),
  showPontuation: Joi.bool().default(false)
})

const response = Joi.object({})

module.exports = {
  request,
  response
}