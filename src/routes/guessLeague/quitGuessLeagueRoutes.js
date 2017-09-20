'use strict'

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const schemas = app.src.routes.schemas

  server.route({
    path: '/guessleague/quitGuessLeague',
    method: 'PUT',
    config: {
      handler: (request, reply) => {

        guessLeagueController.quitGuessLeague(request, reply)
      },
      validate: {
        payload: schemas.guessLeague.quitGuessLeague.quitGuessLeagueSchema.request,
        headers: schemas.defaultHeaderSchema
      }
    }
  })
}