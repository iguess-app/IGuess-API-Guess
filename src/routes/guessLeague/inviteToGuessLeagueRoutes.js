'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const Config = app.coincidents.Config
  const schemas = app.src.routes.schemas
  const ID_SIZE = Config.mongo.idStringSize

  server.route({
    path: '/guessleague/inviteResponse',
    method: 'PUT',
    config: {
      handler: (request, reply) => {

        guessLeagueController.inviteResponse(request, reply)
      },
      validate: {
        query: Joi.object({}),
        payload: Joi.object({
          guessLeagueName: Joi.string().required(),
          userID: Joi.string().required().length(ID_SIZE),
          invitedAccepted: Joi.bool().required()
        })
      }
    }
  })

}