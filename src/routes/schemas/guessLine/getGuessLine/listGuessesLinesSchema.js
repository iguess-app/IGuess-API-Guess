'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const request = Joi.object({
    userRef: Joi.string().length(ID_SIZE).required(),
    onlyActive: Joi.bool().default(false),
    showPontuation: Joi.bool().default(false)
  })

  const response = Joi.object({})

  return {
    request,
    response
  }
}

/*eslint global-require: 0*/