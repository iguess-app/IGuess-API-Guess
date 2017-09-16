'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const fixtureSchema = require('../fixture/fixtureSchema')(app)

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const request = Joi.object({
    userRef: Joi.string().length(ID_SIZE).required(),
    championshipRef: Joi.string().length(ID_SIZE),
    fixture: fixtureSchema
  })

  const response = Joi.object({})

  return {
    request,
    response
  }
}

/*eslint global-require: 0*/