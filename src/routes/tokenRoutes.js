'use strict'

const tokenController = require('../controllers/tokenController')
const server = require('../../configServer')
const defaultSessionHeaderSchema = require('./schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const tokenSchemas = require('./schemas/tokenSchemas')

server.route({
  path: '/token/verify',
  method: 'GET',
  config: {
    handler: (request, reply) => {
      tokenController(request, reply)
    },
    validate: {
      query: tokenSchemas.request,
      headers: defaultSessionHeaderSchema
    },
    response: {
      schema: tokenSchemas.response
    }
  }
})