'use Strict';

module.exports = (app) => {
  const createGLService = app.src.services.createGLService;
  const StatusUtils = app.coincidents.Utils.statusUtils;

  const laucher = (request, reply) => {
    //Just calling yoo() temporally 
    //const guessesInterpreter = app.src.cron.guessesInterpreter.yoo();
  }

  const createLeague = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    createGLService.createLeague(payload, headers)
      .then((response) => reply(response).code(StatusUtils.created))
      .catch((err) => reply(err))
  }

  return {
    laucher,
    createLeague
  }
}