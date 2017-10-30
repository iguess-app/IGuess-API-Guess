'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const championshipEmbbededSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  userRef: Joi.string().required().length(ID_SIZE)
}).meta({
  className: 'Request'
})

const response = Joi.array().items(Joi.object({
  _id: Joi.object().required(),
  guessLeagueName: Joi.string().allow('').required(),
  championship: championshipEmbbededSchema.required()
})).meta({
  className: 'Response'
})

module.exports = {
  request,
  response
}