'use strict'

const guessLeagueController = require('../../controllers/guessLeagueController')
const server = require('../../../configServer')
const defaultHeaderSchema = require('../schemas/defaultHeaderSchema')
const listGuessLeagueSchema = require('../schemas/guessLeague/listGuessLeague/listGuessLeagueSchema')

server.route({
  path: '/guessleague/listGuessesLeagues',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      guessLeagueController.listGuessLeagues(request, reply)
    },
    validate: {
      query: listGuessLeagueSchema.request,
      headers: defaultHeaderSchema
    }
  }
})


//TODO adicionar schema de response


//SEPARAR O LIST DO GET
//NO LIST DEVOLVE SÓ O NOME E O CHAMP E DEVOLVE TODAS GLES
//NO GET DEVOLVE SO UMA GLE E DEVOLVE TDS DETALHER COMO ESTAO AQUI