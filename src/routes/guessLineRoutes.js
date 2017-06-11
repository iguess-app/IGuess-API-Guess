'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const server = app.configServer
  const guessLineInterpreter = app.src.cron.guessLineInterpreter
  const guessLineController = app.src.controllers.guessLineController
  const Config = app.coincidents.Config
  const profileLimits = Config.profile
  const NAME_MAX_SIZE = profileLimits.userNameMaxSize
  const ID_SIZE = Config.mongo.idStringSize

  server.route({
    path: '/guessline/addGuessLine',
    method: 'POST',
    config: {
      handler: (request, reply) => {
        guessLineController.addGuessLine(request, reply)
      },
      validate: {
        payload: Joi.object({
          championshipId: Joi.string().length(ID_SIZE).required()
        })
      },
      response: {
        schema: Joi.object({
          _id: Joi.object().required(),
          championshipRef: Joi.string().length(ID_SIZE).required(),
          championship: Joi.object({
            season: Joi.string().required(),
            league: Joi.string().required(),
            championship: Joi.string().required()
          }),
          fixtures: Joi.array()
        }).meta({
          className: 'Response'
        })
      }
    }
  })

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

  server.route({
    path: '/guessline/setPredictions',
    method: 'POST',
    config: {
      handler: (request, reply) => {
        guessLineController.setPredictions(request, reply)
      },
      validate: {
        payload: Joi.object({
          userName: Joi.string().max(NAME_MAX_SIZE),
          championshipId: Joi.string().length(ID_SIZE),
          fixtureNumber: Joi.number(),
          predictions: Joi.array().items({
            homeTeam: Joi.string().length(ID_SIZE),
            awayTeam: Joi.string().length(ID_SIZE),
            finalScore: Joi.string()
          })
        }),
        headers: Joi.object({
          language: Joi.string().default('en-us')
        }).unknown()
      },
      response: {
        schema: Joi.object({
          guessLineSetted: Joi.bool().required()
        }).meta({
          className: 'Response'
        })
      }
    }
  })
}