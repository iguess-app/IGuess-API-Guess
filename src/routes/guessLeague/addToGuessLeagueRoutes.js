'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const addToGuessLeagueSchema = require('../schemas/guessLeague/addToGuessLeague/addToGuessLeagueSchema')

server.route({
  path: '/guessleague/addToGuessLeague',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {

      guessLeagueController.addToGuessLeague(request, reply)
    },
    validate: {
      payload: addToGuessLeagueSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: addToGuessLeagueSchema.response
    }
  }
})