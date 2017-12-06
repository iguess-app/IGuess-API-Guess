'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').tempHeader
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
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: createGuessLeagueSchema.response
    }
  }
})