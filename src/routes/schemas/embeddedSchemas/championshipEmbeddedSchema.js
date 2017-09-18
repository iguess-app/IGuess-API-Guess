'use strict'

const Joi = require('joi')

module.exports = (app) => {

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const championshipEmbeddedSchema = Joi.object({
    championshipRef: Joi.string().length(ID_SIZE).required(),
    league: Joi.string().length(ID_SIZE).required(),
    season: Joi.string().required(),
    championship: Joi.string().required()
  })

  return championshipEmbeddedSchema
}