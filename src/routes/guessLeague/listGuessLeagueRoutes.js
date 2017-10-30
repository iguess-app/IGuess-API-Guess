'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
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
      headers: defaultHeaderSchema
    },
    response: {
      schema: listGuessLeagueSchema.response
    }
  }
})