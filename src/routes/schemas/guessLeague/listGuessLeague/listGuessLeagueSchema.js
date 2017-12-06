'use strict'

const Joi = require('joi')

const championshipEmbbededSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const request = Joi.empty()

const response = Joi.array().items(Joi.object({
  _id: Joi.object().required(),
  guessLeagueName: Joi.string().allow('').required(),
  championship: championshipEmbbededSchema.required()
}))

module.exports = {
  request,
  response
}