'use strict'

const statusUtils = require('iguess-api-coincidents').Utils.statusUtils

const guessLeaguesServices = require('../services/guessLeagues')

const createGuessLeague = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.createGuessLeagueService(payload, headers)
    .then((response) => reply(response).code(statusUtils.created))
    .catch((err) => reply(err))
}

const listGuessLeagues = (request, reply) => {
  const payload = request.query
  const headers = request.headers

  guessLeaguesServices.listGuessLeagueService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const getGuessLeague = (request, reply) => {
  const query = request.query
  const headers = request.headers

  guessLeaguesServices.getGuessLeagueService(query, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const quitGuessLeague = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.quitGuessLeagueService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const putAdministrator = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.putAdministratorService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const quitAdministrator = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.quitAdministratorService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const inviteToGuessLeague = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.inviteToGuessLeagueService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const inviteResponse = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.inviteResponseService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

module.exports = {
  createGuessLeague,
  listGuessLeagues,
  getGuessLeague,
  inviteToGuessLeague,
  putAdministrator,
  quitAdministrator,
  quitGuessLeague,
  inviteResponse
}