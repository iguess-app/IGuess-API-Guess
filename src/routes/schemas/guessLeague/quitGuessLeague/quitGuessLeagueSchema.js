'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const request = Joi.object({
    guessLeagueRef: Joi.string().required().length(ID_SIZE),
    userRef: Joi.string().required().length(ID_SIZE)
  }).meta({
    className: 'Request'
  })

  const response = Joi.object({}).unknown().meta({
    className: 'Response'
  })

  return {
    request,
    response
  }
}