'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
const createGuessLeagueSchema = require('../schemas/guessLeague/createGuessLeague/createGuessLeagueSchema')

server.route({
  path: '/guessleague/createGuessLeague',
  method: 'POST',
  config: {
    handler: (request, reply) => {

      guessLeagueController.createGuessLeague(request, reply)
    },
    validate: {
      payload: createGuessLeagueSchema.request,
      headers: defaultHeaderSchema
    },
    response: {
      schema: createGuessLeagueSchema.response
    }
  }
})