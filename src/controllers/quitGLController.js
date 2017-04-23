'use Strict';

module.exports = (app) => {
  const quitGLService = app.src.services.quitGLService;

  const quitGuessLeague = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    quitGLService.quitGuessLeague(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    quitGuessLeague
  }
}