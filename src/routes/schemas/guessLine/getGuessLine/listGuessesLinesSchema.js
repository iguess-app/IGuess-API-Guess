'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const championshipEmbbededSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const request = Joi.object({
  userRef: Joi.string().length(ID_SIZE).required(),
  onlyActive: Joi.bool().default(false),
  showPontuation: Joi.bool().default(false)
})

const response = Joi.array().items(
  Joi.object({
    championship: championshipEmbbededSchema.required(),
    guessLineActive: Joi.bool().required(),
    pontuation: Joi.number()
  })
) 

module.exports = {
  request,
  response
}