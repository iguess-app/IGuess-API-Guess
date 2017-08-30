/* eslint-disable */
'use strict'
const Joi = require('joi')

module.exports = (app) => {
  const server = app.configServer
  const schemas = app.src.schemas
  const guessLineInterpreter = app.src.cron.guessLineInterpreter
  const guessLineController = app.src.controllers.guessLineController
  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize
  const MIN_POSSIBLE_SCORE = Config.guess.minPossibleScore
  const MAX_ROUND_ROBIN_FIXTURES = Config.holi.maxRoundRobinFixtures
  const MIN_ROUND_ROBIN_FIXTURES = Config.holi.minRoundRobinFixtures
  const KNOCKOUT_TOURNAMENT_ROUND_NAMES = Config.holi.knockoutTournamentRoundNames

  const fixtureSchema = Joi.alternatives().try(
    Joi.number().min(MIN_ROUND_ROBIN_FIXTURES).max(MAX_ROUND_ROBIN_FIXTURES).description('Round-robin tournament'),
    Joi.any().valid(KNOCKOUT_TOURNAMENT_ROUND_NAMES).description('Knockout tournaments')).required()

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
          id: Joi.string().required(),
          championshipRef: Joi.string().length(ID_SIZE).required(),
          championship: Joi.object({
            season: Joi.string().required(),
            league: Joi.string().required(),
            championship: Joi.string().required()
          }),
          fixtures: Joi.array(),
          users: Joi.array()
        }).meta({
          className: 'Response'
        })
      }
    }
  })

  server.route({
    path: '/guessline/addUserToGuessLine',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        guessLineController.addUserToGuessLine(request, reply)
      },
      validate: {
        payload: Joi.object({
          championshipId: Joi.string().length(ID_SIZE).required(),
          userId: Joi.string().length(ID_SIZE).required()
        })
      },
      response: {
        schema: Joi.object({
          championship: Joi.object({
            season: Joi.string().required(),
            league: Joi.string().required(),
            championship: Joi.string().required()
          }),
          fixtures: Joi.array().items(
            Joi.object({
              fixture: fixtureSchema,
              fixturesPredictions: Joi.array().items(
                Joi.object({
                  matchRef: Joi.string().length(ID_SIZE).required(),
                  homeTeam: Joi.string().length(ID_SIZE).required(),
                  awayTeam: Joi.string().length(ID_SIZE).required(),
                  homeTeamScore: Joi.number().min(MIN_POSSIBLE_SCORE).required(),
                  awayTeamScore: Joi.number().min(MIN_POSSIBLE_SCORE).required()
                }).required()
              ).required()
            })
          )
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
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        guessLineController.setPredictions(request, reply)
      },
      validate: {
        payload: schemas.setPredictions.setPredictionsSchemaPayload,
        headers: schemas.defaultHeaderSchema
      },
      response: {
        schema: schemas.setPredictions.setPredictionsSchemaResponse
      }
    }
  })
}