'use Strict';

module.exports = (app) => {
  const guessLinesServices = app.src.services.guessLines
  const setPredictionsService = guessLinesServices.setPredictionsService;
  const addGuessLineService = guessLinesServices.addGuessLineService;

  const setPredictions = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    setPredictionsService.setPredictions(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const addGuessLine = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    addGuessLineService.addGuessLine(payload, headers)
      .then((response) =>
        reply(response)
      )
      .catch((err) =>
        reply(err)
      )
  }

  return {
    setPredictions,
    addGuessLine
  }
}