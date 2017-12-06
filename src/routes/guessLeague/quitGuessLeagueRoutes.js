'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').tempHeader
const quitGuessLeagueSchema = require('../schemas/guessLeague/quitGuessLeague/quitGuessLeagueSchema')

server.route({
  path: '/guessleague/quitGuessLeague',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {

      guessLeagueController.quitGuessLeague(request, reply)
    },
    validate: {
      payload: quitGuessLeagueSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: quitGuessLeagueSchema.response
    }
  }
})