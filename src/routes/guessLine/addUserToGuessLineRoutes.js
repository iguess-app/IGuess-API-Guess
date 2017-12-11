'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
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
      headers: defaultSessionHeaderSchema
    },
    response: addUserToGuessLineSchemaResponse
  }
})