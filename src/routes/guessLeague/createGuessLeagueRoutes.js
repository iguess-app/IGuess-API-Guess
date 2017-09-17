'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const Config = app.coincidents.Config
  const schemas = app.src.routes.schemas
  const ID_SIZE = Config.mongo.idStringSize


  server.route({
    path: '/guessleague/createGuessLeague',
    method: 'POST',
    config: {
      handler: (request, reply) => {

        guessLeagueController.createGuessLeague(request, reply)
      },
      validate: {
        payload: Joi.object({
          guessLeagueName: Joi.string().required(),
          championshipId: Joi.string().length(ID_SIZE),
          championship: Joi.object({
            _id: Joi.string().required(),
            championship: Joi.string().required(),
            league: Joi.string().required(),
            season: Joi.string().required()
          }).required(),
          userID: Joi.string().required().length(ID_SIZE),
          inviteads: Joi.array().required()
        })
      },
      response: {
        schema: Joi.object({
            guessLeagueCreated: Joi.bool().required(),
            guessLeague: Joi.object().required()
          })
          .meta({
            className: 'Response'
          })
      }
    }
  })

}