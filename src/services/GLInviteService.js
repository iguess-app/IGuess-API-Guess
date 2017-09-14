'use strict'

module.exports = (app) => {
  const GLInviteRepository = app.src.repositories.GLInviteRepository;

  const inviteResponse = (payload, headers) =>
    GLInviteRepository.inviteResponse(payload, headers)
    .then((response) => response) //TODO Update the profile.guessLeague too
    .catch((err) => err)

  return {
    inviteResponse
  }
}