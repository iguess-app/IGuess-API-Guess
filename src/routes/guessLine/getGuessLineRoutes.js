'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').tempHeader
const getGuessLineSchema = require('../schemas/guessLine/getGuessLine/getGuessLineSchema')

server.route({
  path: '/guessline/getGuessLine',
  method: 'GET',
  config: {
    handler: (request, reply) => {
      guessLineController.getGuessLine(request, reply)
    },
    validate: {
      query: getGuessLineSchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: getGuessLineSchema.response
    }
  }
})


/*
  TODO: Schemas de req, res and header
*/