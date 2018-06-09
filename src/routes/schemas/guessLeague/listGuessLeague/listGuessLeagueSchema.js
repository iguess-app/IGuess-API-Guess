'use strict'

const Joi = require('joi')

const championshipEmbbededSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const request = Joi.empty()

const response = Joi.object({
  allowToAddMoreLeague: Joi.bool().required(),
  guessLeaguesList: Joi.array().items(
    Joi.object({
      _id: Joi.object().required(),
      guessLeagueName: Joi.string().allow('').required(),
      championship: championshipEmbbededSchema.required(),
      numberOfUsersAtLeague: Joi.number().integer().required()
    })
  )
})

module.exports = {
  request,
  response
}