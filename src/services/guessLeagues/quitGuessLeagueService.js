'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const quitGuessLeagueRepository = require('../../repositories/guessLeagues/quitGuessLeagueRepository')

const quitGuessLeague = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return quitGuessLeagueRepository(payload, dictionary)
}

module.exports = quitGuessLeague