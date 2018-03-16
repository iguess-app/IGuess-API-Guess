'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const listLeaguesWithActiveLinesSchema = require('../schemas/guessLine/listLeaguesWithActiveLines/listLeaguesWithActiveLinesSchema')

server.route({
  path: '/guessline/listLeaguesWithActiveLines',
  method: 'GET',
  config: {
    handler: (request, reply) => {
      guessLineController.listLeaguesWithActiveLines(request, reply)
    },
    validate: {
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: listLeaguesWithActiveLinesSchema.response
    }
  }
})