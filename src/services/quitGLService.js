'use Strict';

module.exports = (app) => {
  const quitGLRepository = app.src.repositories.quitGLRepository;

  const quitGuessLeague = (payload, headers) =>
    quitGLRepository.quitGuessLeague(payload, headers)
    .then((response) => response) //TODO Update the profile.guessLeague too
    .catch((err) => err)

  return {
    quitGuessLeague
  }
}