'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema')
const inviteToGuessLeagueSchema = require('../schemas/guessLeague/inviteToGuessLeague/inviteToGuessLeagueSchema')
const inviteResponseSchema = require('../schemas/guessLeague/inviteResponse/inviteResponseSchema')

server.route({
  path: '/guessleague/inviteToGuessLeague',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {

      guessLeagueController.inviteToGuessLeague(request, reply)
    },
    validate: {
      payload: inviteToGuessLeagueSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: inviteToGuessLeagueSchema.response
    }
  }
})

server.route({
  path: '/guessleague/inviteResponse',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {

      guessLeagueController.inviteResponse(request, reply)
    },
    validate: {
      payload: inviteResponseSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: inviteResponseSchema.response
    }
  }
})