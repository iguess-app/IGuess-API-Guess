'use Strict';

module.exports = (app) => {
  const createGLRepository = app.src.repositories.createGLRepository;

  const createLeague = (payload, headers) =>
    createGLRepository.createLeague(payload, headers)
    .then((createdLeague) =>
      //TODO Add on profile.notifications the invite (createdLeague.players)
      createdLeague)
    .catch((err) =>
      //TODO verify if err.code===11000 and return 'guessLeagueName already in use'
      err)

  return {
    createLeague
  }
};