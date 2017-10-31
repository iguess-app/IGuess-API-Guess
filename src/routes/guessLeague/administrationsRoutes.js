'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
const putAdministratorSchema = require('../schemas/guessLeague/administration/putAdministratorSchema')
const quitCaptainSchema = require('../schemas/guessLeague/administration/quitCaptainSchema')

server.route({
  path: '/guessleague/putAdministrator',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {

      guessLeagueController.putAdministrator(request, reply)
    },
    validate: {
      payload: putAdministratorSchema.request,
      headers: defaultHeaderSchema
    },
    response: {
      schema: putAdministratorSchema.response
    }
  }
})

server.route({
  path: '/guessleague/quitCaptain',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {

      guessLeagueController.quitCaptain(request, reply)
    },
    validate: {
      payload: quitCaptainSchema.request,
      headers: defaultHeaderSchema
    },
    response: {
      schema: quitCaptainSchema.response
    }
  }
})