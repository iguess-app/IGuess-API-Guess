'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const guessController = app.src.controllers.createGLController;
  const server = app.configServer;

  server.route({
    path: '/guess/laucher',
    method: 'GET',
    config: {
      handler: (request, reply) => {

        guessController.laucher(request, reply)
      },
      validate: {
        query: Joi.object({})
      },
      response: {
        schema: Joi.object().unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })


  server.route({
    path: '/guessleague/create',
    method: 'POST',
    config: {
      handler: (request, reply) => {

        guessController.createLeague(request, reply)
      },
      validate: {
        query: Joi.object({}),
        payload: Joi.object({
          guessLeagueName: Joi.string().required(),
          championship: Joi.string().required(),
          userID: Joi.string().required(),
          invited: Joi.array().required()
        })
      },
      response: {
        schema: Joi.object().unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })
};