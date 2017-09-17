'use strict'

module.exports = (app) => {
  const server = app.configServer
  const schemas = app.src.routes.schemas
  const guessLineController = app.src.controllers.guessLineController
  
  server.route({
    path: '/guessline/listGuessesLines',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        guessLineController.listGuessesLines(request, reply)
      },
      validate: {
        query: schemas.guessLine.getGuessLine.listGuessesLinesSchema.request,
        headers: schemas.defaultHeaderSchema
      }
    }
  })
}

/*
  TODO: Schemas de req, res and header
*/