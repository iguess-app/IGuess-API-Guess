'use strict'

const Joi = require('joi')

module.exports = (app) => {

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const addUserToGuessLineSchemaRequest = Joi.object({
    championshipRef: Joi.string().length(ID_SIZE).required(),
    userRef: Joi.string().length(ID_SIZE).required()
  })

  return addUserToGuessLineSchemaRequest
}

/*eslint global-require: 0*/