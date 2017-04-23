'use Strict';

module.exports = (app) => {
  const GLInviteService = app.src.services.GLInviteService;
 
  const inviteResponse = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    GLInviteService.inviteResponse(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    inviteResponse
  }
}