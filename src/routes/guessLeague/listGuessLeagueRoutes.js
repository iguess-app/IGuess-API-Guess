'use strict'

module.exports = (app) => {
  const guessLeagueController = app.src.controllers.guessLeagueController
  const server = app.configServer
  const schemas = app.src.routes.schemas

  server.route({
    path: '/guessleague/listGuessesLeagues',
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


//SEPARAR O LIST DO GET
//NO LIST DEVOLVE SÓ O NOME E O CHAMP E DEVOLVE TODAS GLES
//NO GET DEVOLVE SO UMA GLE E DEVOLVE TDS DETALHER COMO ESTAO AQUI