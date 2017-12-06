'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const getGuessLeagueSchema = require('../schemas/guessLeague/getGuessLeague/getGuessLeagueSchema')

server.route({
  path: '/guessleague/getGuessLeague',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      guessLeagueController.getGuessLeague(request, reply)
    },
    validate: {
      query: getGuessLeagueSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: getGuessLeagueSchema.response
    }
  }
})