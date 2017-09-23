'use strict'

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const schemas = app.src.routes.schemas

  server.route({
    path: '/guessleague/inviteToGuessLeague',
    method: 'PATCH',
    config: {
      handler: (request, reply) => {

        guessLeagueController.inviteToGuessLeague(request, reply)
      },
      validate: {
        payload: schemas.guessLeague.inviteToGuessLeague.inviteToGuessLeagueSchema.request,
        headers: schemas.defaultHeaderSchema
      }
    }
  })

  server.route({
    path: '/guessleague/inviteResponse',
    method: 'PATCH',
    config: {
      handler: (request, reply) => {

        guessLeagueController.inviteResponse(request, reply)
      },
      validate: {
        payload: schemas.guessLeague.inviteResponse.inviteResponseSchema.request,
        headers: schemas.defaultHeaderSchema
      }
    }
  })

}