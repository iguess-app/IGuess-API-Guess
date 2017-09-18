'use strict'

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const schemas = app.src.routes.schemas

  server.route({
    path: '/guessleague/createGuessLeague',
    method: 'POST',
    config: {
      handler: (request, reply) => {

        guessLeagueController.createGuessLeague(request, reply)
      },
      validate: {
        payload: schemas.guessLeague.createGuessLeague.createGuessLeagueSchema.request,
        headers: schemas.defaultHeaderSchema
      },
      response: {
        schema: schemas.guessLeague.createGuessLeague.createGuessLeagueSchema.response
      }
    }
  })

}