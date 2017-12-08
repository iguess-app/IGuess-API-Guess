'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const editGuessLeagueSchema = require('../schemas/guessLeague/editGuessLeague/editGuessLeagueSchema')

server.route({
  path: '/guessleague/editGuessLeague',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {

      guessLeagueController.editGuessLeague(request, reply)
    },
    validate: {
      payload: editGuessLeagueSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: editGuessLeagueSchema.response
    }
  }
})