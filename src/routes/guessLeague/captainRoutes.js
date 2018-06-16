'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const putCaptainSchema = require('../schemas/guessLeague/captain/putCaptainSchema')
const quitCaptainSchema = require('../schemas/guessLeague/captain/quitCaptainSchema')
const kickUserFromGuessLeagueSchema = require('../schemas/guessLeague/captain/kickUserFromGuessLeagueSchema')

server.route({
  path: '/guessleague/putCaptain',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {

      guessLeagueController.putCaptain(request, reply)
    },
    validate: {
      payload: putCaptainSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: putCaptainSchema.response
    }
  }
})

server.route({
  path: '/guessleague/quitCaptain',
  method: 'DELETE',
  config: {
    handler: (request, reply) => {

      guessLeagueController.quitCaptain(request, reply)
    },
    validate: {
      payload: quitCaptainSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: quitCaptainSchema.response
    }
  }
})

server.route({
  path: '/guessleague/kickUserFromGuessLeague',
  method: 'DELETE',
  config: {
    handler: (request, reply) => {

      guessLeagueController.kickUserFromGuessLeague(request, reply)
    },
    validate: {
      payload: kickUserFromGuessLeagueSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: kickUserFromGuessLeagueSchema.response
    }
  }
})