'use strict'

module.exports = (app) => {
  const guessLeaguesServices = app.src.services.guessLeagues
  const StatusUtils = app.coincidents.Utils.statusUtils

  const createGuessLeague = (request, reply) => {
    const payload = request.payload
    const headers = request.headers

    guessLeaguesServices.createGuessLeagueService.createGuessLeague(payload, headers)
      .then((response) => reply(response).code(StatusUtils.created))
      .catch((err) => reply(err))
  }

  const listGuessLeagues = (request, reply) => {
    const payload = request.query
    const headers = request.headers

    guessLeaguesServices.listGuessLeagueService.listGuessLeagues(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const getGuessLeague = (request, reply) => {
    const query = request.query
    const headers = request.headers

    guessLeaguesServices.getGuessLeagueService.getGuessLeague(query, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }
  
  const quitGuessLeague = (request, reply) => {
    const payload = request.payload
    const headers = request.headers

    guessLeaguesServices.quitGuessLeagueService.quitGuessLeague(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const putAdministrator = (request, reply) => {
    const payload = request.payload
    const headers = request.headers

    guessLeaguesServices.putAdministratorService.putAdministrator(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const inviteResponse = (request, reply) => {
    const payload = request.payload
    const headers = request.headers

    guessLeaguesServices.GLInviteService.inviteResponse(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    createGuessLeague,
    listGuessLeagues,
    getGuessLeague,
    inviteResponse,
    putAdministrator,
    quitGuessLeague
  }
}

/*eslint max-statements: 0*/