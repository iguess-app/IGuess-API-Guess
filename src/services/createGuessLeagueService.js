'use Strict';

module.exports = (app) => {
  const createGuessLeagueRepository = app.src.repositories.createGuessLeagueRepository;

  const createGuessLeague = (payload, headers) =>
    createGuessLeagueRepository.createGuessLeague(payload, headers)
    .then((createdLeague) =>
      //TODO Add on profile.notifications the invite (createdLeague.players)
      createdLeague)
    .catch((err) =>
      //TODO verify if err.code===11000 and return 'guessLeagueName already in use'
      err)

  return {
    createGuessLeague
  }
};