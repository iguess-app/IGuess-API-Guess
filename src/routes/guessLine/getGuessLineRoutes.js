'use strict'

module.exports = (app) => {
  const server = app.configServer
  const schemas = app.src.schemas
  const guessLineController = app.src.controllers.guessLineController

  server.route({
    path: '/guessline/getGuessLine',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        guessLineController.getGuessLine(request, reply)
      }
    }
  })
}