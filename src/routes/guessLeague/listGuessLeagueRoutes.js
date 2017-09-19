'use strict'

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const schemas = app.src.routes.schemas

  server.route({
    path: '/guessleague/listGuessLeagues',
    method: 'GET',
    config: {
      handler: (request, reply) => {

        guessLeagueController.listGuessLeagues(request, reply)
      },
      validate: {
        query: schemas.guessLeague.listGuessLeague.listGuessLeagueSchema.request,
        headers: schemas.defaultHeaderSchema
      }
    }
  })

}

//TODO adicionar schema de response