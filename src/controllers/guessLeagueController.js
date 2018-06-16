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
  const headers = request.headers

  guessLeaguesServices.listGuessLeagueService(headers)
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

const putCaptain = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.putCaptainService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const quitCaptain = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.quitCaptainService(payload, headers)
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

const editGuessLeague = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.editGuessLeague(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const addToGuessLeague = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.addToGuessLeagueService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const kickUserFromGuessLeague = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLeaguesServices.kickUserFromGuessLeagueService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

module.exports = {
  createGuessLeague,
  listGuessLeagues,
  getGuessLeague,
  inviteToGuessLeague,
  putCaptain,
  quitCaptain,
  quitGuessLeague,
  inviteResponse,
  editGuessLeague,
  addToGuessLeague,
  kickUserFromGuessLeague
}