'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
const putAdministratorSchema = require('../schemas/guessLeague/administration/putAdministratorSchema')
const quitAdministrationSchema = require('../schemas/guessLeague/administration/quitAdministrationSchema')

server.route({
  path: '/guessleague/putAdministrator',
  method: 'PUT',
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
  path: '/guessleague/quitAdministrator',
  method: 'PUT',
  config: {
    handler: (request, reply) => {

      guessLeagueController.quitAdministrator(request, reply)
    },
    validate: {
      payload: quitAdministrationSchema.request,
      headers: defaultHeaderSchema
    },
    response: {
      schema: quitAdministrationSchema.response
    }
  }
})