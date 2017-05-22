'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const server = app.configServer;
  const guessLineInterpreter = app.src.cron.guessLineInterpreter;

  server.route({
    path: '/guessline/laucher',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        guessLineInterpreter.runInterpreter();
        reply('running');
      },
      validate: {
        query: Joi.object({})
      },
      response: {
        schema: Joi.string()
          .meta({
            className: 'Response'
          })
      }
    }
  })
}