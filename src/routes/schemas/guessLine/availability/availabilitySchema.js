'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  userRef: Joi.string().length(ID_SIZE).required(),
  championshipRef: Joi.string().length(ID_SIZE).required(),
  notBoomIfNotFound: Joi.bool().default(true)
})

const response = {
  schema: Joi.object({
    userRefAtGuessLineList: Joi.bool().required()
  }).meta({
    className: 'Response'
  })
}

module.exports = {
  request,
  response
}