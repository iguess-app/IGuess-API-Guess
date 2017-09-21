'use strict'

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const schemas = app.src.routes.schemas

  server.route({
    path: '/guessleague/putAdministrator',
    method: 'PUT',
    config: {
      handler: (request, reply) => {

        guessLeagueController.putAdministrator(request, reply)
      },
      validate: {
        payload: schemas.guessLeague.administration.putAdministratorSchema.request,
        headers: schemas.defaultHeaderSchema
      },
      response: {
        schema: schemas.guessLeague.administration.putAdministratorSchema.response
      }
    }
  })

}