'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const editGuessLeagueRepository = require('../../repositories/guessLeagues/editGuessLeagueRepository')

const editGuessLeagues = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  return editGuessLeagueRepository(payload, dictionary)
}

module.exports = editGuessLeagues