'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const getGuessLeagueRepository = app.src.repositories.getGuessLeagueRepository;

  const getGuessLeague = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getGuessLeagueRepository.getGuessLeague(payload, dictionary)
      .then((guessLeague) => guessLeague)
      .catch((err) => {
        throw Boom.badRequest(err)
      })
  }

  return {
    getGuessLeague
  }
};