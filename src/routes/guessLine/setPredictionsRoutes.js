'use strict'

module.exports = (app) => {
  const server = app.configServer
  const schemas = app.src.schemas
  const guessLineController = app.src.controllers.guessLineController

  server.route({
    path: '/guessline/setPredictions',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        guessLineController.setPredictions(request, reply)
      },
      validate: {
        payload: schemas.setPredictions.setPredictionsSchemaPayload,
        headers: schemas.defaultHeaderSchema
      },
      response: {
        schema: schemas.setPredictions.setPredictionsSchemaResponse
      }
    }
  })
}