'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  leagueRef: Joi.string().length(ID_SIZE).required()
})

const response = Joi.array().items({
  _id: Joi.object().required(),
  championship: Joi.string().required(),
  season: Joi.string().required()
})

module.exports = {
  request,
  response
}