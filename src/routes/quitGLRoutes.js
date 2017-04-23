'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const quitGLController = app.src.controllers.quitGLController;
  const server = app.configServer;

  server.route({
    path: '/guessleague/quit',
    method: 'PUT',
    config: {
      handler: (request, reply) => {

        quitGLController.quitGuessLeague(request, reply)
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
}