'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
const listGuessesLinesSchema = require('../schemas/guessLine/getGuessLine/listGuessesLinesSchema')

server.route({
  path: '/guessline/listGuessesLines',
  method: 'GET',
  config: {
    handler: (request, reply) => {
      guessLineController.listGuessesLines(request, reply)
    },
    validate: {
      query: listGuessesLinesSchema.request,
      headers: defaultHeaderSchema
    },
    response: {
      schema: listGuessesLinesSchema.response
    }
  }
})


/*
  TODO: Schemas de req, res and header
*/