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

const listGuessesLines = (request, reply) => {
  const payload = request.query
  const headers = request.headers

  guessLinesServices.listGuessesLinesService(payload, headers)
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

module.exports = {
  setPredictions,
  addUserToGuessLine,
  listGuessesLines,
  getGuessLine,
  userAtGuessLine
}