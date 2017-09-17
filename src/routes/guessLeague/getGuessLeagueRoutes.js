'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const Config = app.coincidents.Config
  const schemas = app.src.routes.schemas
  const ID_SIZE = Config.mongo.idStringSize

  server.route({
    path: '/guessleague/getGuessLeague',
    method: 'GET',
    config: {
      handler: (request, reply) => {
  
        guessLeagueController.getGuessLeague(request, reply)
      },
      validate: {
        query: Joi.object({
          guessLeagueName: Joi.string().required()
        })
      },
      response: {
        schema: Joi.object({
          administrator: Joi.string().required(),
          guessLeagueName: Joi.string().required(),
          championship: Joi.object({
            _id: Joi.string().required(),
            championship: Joi.string().required(),
            league: Joi.string().required(),
            season: Joi.string().required()
          }).required(),
          players: Joi.array().items({
            userName: Joi.string().required(),
            pontuation: Joi.array()
          }),
          inviteads: Joi.array().items()
        }).meta({
          className: 'Response'
        })
      }
    }
  })  

}