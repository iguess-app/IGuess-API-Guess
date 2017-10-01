'use strict'

const guessLineController = require('../../controllers/guessLineController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
const setPredictionsSchemaPayload = require('../schemas/guessLine/setPredictions/setPredictionsSchemaPayload')
const setPredictionsSchemaResponse = require('../schemas/guessLine/setPredictions/setPredictionsSchemaResponse')

server.route({
  path: '/guessline/setPredictions',
  method: 'PUT',
  config: {
    handler: (request, reply) => {
      guessLineController.setPredictions(request, reply)
    },
    validate: {
      payload: setPredictionsSchemaPayload,
      headers: defaultHeaderSchema
    },
    response: {
      schema: setPredictionsSchemaResponse
    }
  }
})