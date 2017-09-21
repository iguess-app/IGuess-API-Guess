'use strict'

module.exports = (app) => {
  const guessLineController = app.src.controllers.guessLineController
  const server = app.configServer
  const schemas = app.src.routes.schemas

  server.route({
    path: '/guessline/userAtGuessLine',
    method: 'GET',
    config: {
      handler: (request, reply) => {

        guessLineController.userAtGuessLine(request, reply)
      },
      validate: {
        query: schemas.guessLine.availability.availabilitySchema.request,
        headers: schemas.defaultHeaderSchema
      }
    }
  })

}