'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const listUserGuessesLinesSchema = require('../schemas/guessLine/getGuessLine/listUserGuessesLinesSchema')

server.route({
  path: '/guessline/listUserGuessesLines',
  method: 'GET',
  config: {
    handler: (request, reply) => {
      guessLineController.listUserGuessesLines(request, reply)
    },
    validate: {
      query: listUserGuessesLinesSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: listUserGuessesLinesSchema.response
    }
  }
})