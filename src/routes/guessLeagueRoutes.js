'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController;
  const server = app.configServer;
  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  server.route({
    path: '/guessleague/create',
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

  server.route({
    path: '/guessleague/getInfo',
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

  server.route({
    path: '/guessleague/quit',
    method: 'PUT',
    config: {
      handler: (request, reply) => {

        guessLeagueController.quitGuessLeague(request, reply)
      },
      validate: {
        query: Joi.object({}),
        payload: Joi.object({
          guessLeagueName: Joi.string().required(),
          userID: Joi.string().required().length(ID_SIZE)
        })
      }
    }
  })

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
};