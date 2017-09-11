'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const fixtureSchema = require('../fixture/fixtureSchema')(app)

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const updateGuessLinesPredictionsPontuationsSchemaRequest = Joi.object({
    championshipRef: Joi.string().length(ID_SIZE).required(),
    fixture: fixtureSchema.required()
  })

  return updateGuessLinesPredictionsPontuationsSchemaRequest
}

/*eslint global-require: 0*/