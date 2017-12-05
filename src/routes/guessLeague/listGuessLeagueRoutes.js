'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema')
const listGuessLeagueSchema = require('../schemas/guessLeague/listGuessLeague/listGuessLeagueSchema')

server.route({
  path: '/guessleague/listGuessesLeagues',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      guessLeagueController.listGuessLeagues(request, reply)
    },
    validate: {
      query: listGuessLeagueSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: listGuessLeagueSchema.response
    }
  }
})