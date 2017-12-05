'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const availabilitySchema = require('../schemas/guessLine/availability/availabilitySchema')

server.route({
  path: '/guessline/userAtGuessLine',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      guessLineController.userAtGuessLine(request, reply)
    },
    validate: {
      query: availabilitySchema.request,
      headers: defaultSessionHeaderSchema
    },
    response: availabilitySchema.response
  }
})