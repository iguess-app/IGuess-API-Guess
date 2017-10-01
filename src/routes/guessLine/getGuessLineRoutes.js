'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
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
      headers: defaultHeaderSchema
    },
    response: {
      schema: getGuessLineSchema.response
    }
  }
})


/*
  TODO: Schemas de req, res and header
*/