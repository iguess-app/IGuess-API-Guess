'use Strict'

module.exports = (app) => {
  const guessLinesServices = app.src.services.guessLines
  const setPredictionsService = guessLinesServices.setPredictionsService
  const addUserToGuessLineService = guessLinesServices.addUserToGuessLineService
  const getGuessLineService = guessLinesServices.getGuessLineService
  const listGuessesLinesService = guessLinesServices.listGuessesLinesService

  const addUserToGuessLine = (request, reply) => {
    const payload = request.payload
    const headers = request.headers

    addUserToGuessLineService.addUserToGuessLine(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const setPredictions = (request, reply) => {
    const payload = request.payload
    const headers = request.headers

    setPredictionsService.setPredictions(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const listGuessesLines = (request, reply) => {
    const payload = request.query
    const headers = request.headers

    listGuessesLinesService.listGuessesLines(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const getGuessLine = (request, reply) => {
    const payload = request.query
    const headers = request.headers

    getGuessLineService.getGuessLine(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    setPredictions,
    addUserToGuessLine,
    listGuessesLines,
    getGuessLine
  }
}