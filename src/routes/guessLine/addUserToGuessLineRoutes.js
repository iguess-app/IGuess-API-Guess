'use strict'

module.exports = (app) => {
  const server = app.configServer
  const schemas = app.src.schemas
  const guessLineController = app.src.controllers.guessLineController

  server.route({
    path: '/guessline/addUserToGuessLine',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        guessLineController.addUserToGuessLine(request, reply)
      },
      validate: {
        payload: schemas.addUserToGuessLine.addUserToGuessLineSchemaRequest,
        headers: schemas.defaultHeaderSchema
      },
      response: schemas.addUserToGuessLine.addUserToGuessLineSchemaResponse
    }
  })
}