'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const GLInviteController = app.src.controllers.GLInviteController;
  const server = app.configServer;

  server.route({
    path: '/guessleague/inviteResponse',
    method: 'PUT',
    config: {
      handler: (request, reply) => {

        GLInviteController.inviteResponse(request, reply)
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
}