'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
const quitGuessLeagueSchema = require('../schemas/guessLeague/quitGuessLeague/quitGuessLeagueSchema')

server.route({
  path: '/guessleague/quitGuessLeague',
  method: 'PUT',
  config: {
    handler: (request, reply) => {

      guessLeagueController.quitGuessLeague(request, reply)
    },
    validate: {
      payload: quitGuessLeagueSchema.request,
      headers: defaultHeaderSchema
    }
  }
})