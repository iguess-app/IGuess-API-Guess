'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const championshipEmbeddedSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')(app)
  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const request = Joi.object({
    guessLeagueName: Joi.string().required(),
    championshipRef: Joi.string().length(ID_SIZE).required(),
    userRef: Joi.string().required().length(ID_SIZE),
    inviteads: Joi.array().items(
      Joi.string().length(ID_SIZE).required()
    )
  }).meta({
    className: 'Request'
  })

  const response = Joi.object({
    guessLeagueName: Joi.string().required(),
    championship: championshipEmbeddedSchema.required().unknown(),
    inviteads: Joi.array().items(
      Joi.string().length(ID_SIZE)
    ),
    players: Joi.array().items(
      Joi.string().length(ID_SIZE).required()
    ),
    administrators: Joi.array().items(
      Joi.string().length(ID_SIZE).required()
    )
  }).unknown().meta({
    className: 'Response'
  })

  return {
    request,
    response
  }
}

/*eslint global-require: 0*/