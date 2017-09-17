'use strict'

const Joi = require('joi')

module.exports = (app) => {

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const teamEmbbededSchema = Joi.object({
    teamRef: Joi.string().length(ID_SIZE).required(),
    league: Joi.string().length(ID_SIZE).required(),
    fullName: Joi.string().required(),
    shortName: Joi.string().required(),
    logo: Joi.string()
  })

  return teamEmbbededSchema
}