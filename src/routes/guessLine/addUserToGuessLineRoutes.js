'use strict'

module.exports = (app) => {
  const server = app.configServer
  const schemas = app.src.routes.schemas
  const guessLineController = app.src.controllers.guessLineController

  server.route({
    path: '/guessline/addUserToGuessLine',
    method: 'PUT',
    config: {
      handler: (request, reply) => {
        guessLineController.addUserToGuessLine(request, reply)
      },
      validate: {
        payload: schemas.guessLine.addUserToGuessLine.addUserToGuessLineSchemaRequest,
        headers: schemas.defaultHeaderSchema
      },
      response: schemas.guessLine.addUserToGuessLine.addUserToGuessLineSchemaResponse
    }
  })
}