'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const listGuessLeagueRepository = require('../../repositories/guessLeagues/listGuessLeagueRepository')

const listGuessLeagues = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return listGuessLeagueRepository(payload, dictionary)
}

module.exports = listGuessLeagues