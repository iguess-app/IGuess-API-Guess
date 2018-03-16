'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const listLinesByLeagueSchema = require('../schemas/guessLine/listLinesByLeague/listLinesByLeagueSchema')

server.route({
  path: '/guessline/listLinesByLeague',
  method: 'GET',
  config: {
    handler: (request, reply) => {
      guessLineController.listLinesByLeague(request, reply)
    },
    validate: {
      headers: defaultSessionHeaderSchema,
      query: listLinesByLeagueSchema.request
    },
    response: {
      schema: listLinesByLeagueSchema.response
    }
  }
})