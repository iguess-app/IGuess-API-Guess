'use Strict';

module.exports = (app) => {
  const GLInviteService = app.src.services.GLInviteService;
  const createGuessLeagueService = app.src.services.createGuessLeagueService;
  const quitGLService = app.src.services.quitGLService;
  const StatusUtils = app.coincidents.Utils.statusUtils;

  const createGuessLeague = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    createGuessLeagueService.createGuessLeague(payload, headers)
      .then((response) => reply(response).code(StatusUtils.created))
      .catch((err) => reply(err))
  }

  const inviteResponse = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    GLInviteService.inviteResponse(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }
  
  const quitGuessLeague = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    quitGLService.quitGuessLeague(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    createGuessLeague,
    inviteResponse,
    quitGuessLeague
  }
}