'use Strict';

module.exports = (app) => {
  const setPredictionsService = app.src.services.guessLines.setPredictionsService;

  const setPredictions = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    setPredictionsService.setPredictions(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    setPredictions
  }
}