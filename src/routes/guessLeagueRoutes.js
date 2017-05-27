'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController;
  const server = app.configServer;

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
          championship: Joi.string().required(),
          userID: Joi.string().required(),
          inviteads: Joi.array().required()
        })
      },
      response: {
        schema: Joi.object({
            guessLeagueCreated: Joi.bool().required()
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
          championship: Joi.string().required(),
          players: Joi.array().items({
            userName: Joi.string().required(),
            pontuation: Joi.array()
          }),
          inviteads: Joi.array().items({
            userName: Joi.string()
          })
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
          userID: Joi.string().required()
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
          userID: Joi.string().required(),
          invitedAccepted: Joi.bool().required()
        })
      }
    }
  })
};