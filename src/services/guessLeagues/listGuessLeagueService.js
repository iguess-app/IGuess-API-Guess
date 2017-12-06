'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const listGuessLeagueRepository = require('../../repositories/guessLeagues/listGuessLeagueRepository')

const listGuessLeagues = async (headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers.token, dictionary)

  return listGuessLeagueRepository(session, dictionary)
}

module.exports = listGuessLeagues