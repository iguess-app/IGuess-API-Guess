'use strict'

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const schemas = app.src.routes.schemas

  server.route({
    path: '/guessleague/getGuessLeague',
    method: 'GET',
    config: {
      handler: (request, reply) => {

        guessLeagueController.getGuessLeague(request, reply)
      },
      validate: {
        query: schemas.guessLeague.getGuessLeague.getGuessLeagueSchema.request,
        headers: schemas.defaultHeaderSchema
      }
    }
  })

}