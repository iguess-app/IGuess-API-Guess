'use strict'

const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const Config = coincidents.Config
const ID_SIZE = Config.mongo.idStringSize

const fixtureSchema = require('../fixture/fixtureSchema')

const updateGuessLinesPredictionsPontuationsSchemaRequest = Joi.object({
  championshipRef: Joi.string().length(ID_SIZE).required(),
  fixture: fixtureSchema.required()
})

module.exports = updateGuessLinesPredictionsPontuationsSchemaRequest