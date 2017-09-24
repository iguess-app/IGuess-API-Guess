'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const championshipEmbeddedSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')(app)
  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const request = Joi.object({
    userRef: Joi.string().required().length(ID_SIZE),
    userRefInviteads: Joi.array().items(
      Joi.string().length(ID_SIZE)
    ).required(),
    guessLeagueRef: Joi.string().required().length(ID_SIZE),
    championshipRef: Joi.string().required().length(ID_SIZE)
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

/*eslint global-require: 0*/