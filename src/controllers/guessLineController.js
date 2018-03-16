'use strict'

const guessLinesServices = require('../services/guessLines')

const addUserToGuessLine = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLinesServices.addUserToGuessLineService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const setPredictions = (request, reply) => {
  const payload = request.payload
  const headers = request.headers

  guessLinesServices.setPredictionsService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const listUserGuessesLines = (request, reply) => {
  const payload = request.query
  const headers = request.headers

  guessLinesServices.listUserGuessesLinesService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const getGuessLine = (request, reply) => {
  const payload = request.query
  const headers = request.headers

  guessLinesServices.getGuessLineService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const userAtGuessLine = (request, reply) => {
  const payload = request.query
  const headers = request.headers

  guessLinesServices.userAtGuessLineService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const listLeaguesWithActiveLines = (request, reply) => {
  const headers = request.headers

  guessLinesServices.listLeaguesWithActiveLinesService(headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

const listLinesByLeague = (request, reply) => {
  const payload = request.query
  const headers = request.headers

  guessLinesServices.listLinesByLeagueService(payload, headers)
    .then((response) => reply(response))
    .catch((err) => reply(err))
}

module.exports = {
  setPredictions,
  addUserToGuessLine,
  listUserGuessesLines,
  getGuessLine,
  userAtGuessLine,
  listLeaguesWithActiveLines,
  listLinesByLeague
}