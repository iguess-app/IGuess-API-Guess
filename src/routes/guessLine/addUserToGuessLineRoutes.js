'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
const addUserToGuessLineSchemaRequest = require('../schemas/guessLine/addUserToGuessLine/addUserToGuessLineSchemaRequest')
const addUserToGuessLineSchemaResponse = require('../schemas/guessLine/addUserToGuessLine/addUserToGuessLineSchemaResponse')

server.route({
  path: '/guessline/addUserToGuessLine',
  method: 'PATCH',
  config: {
    handler: (request, reply) => {
      guessLineController.addUserToGuessLine(request, reply)
    },
    validate: {
      payload: addUserToGuessLineSchemaRequest,
      headers: defaultHeaderSchema
    },
    response: addUserToGuessLineSchemaResponse
  }
})