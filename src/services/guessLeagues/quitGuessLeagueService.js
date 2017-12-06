'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const quitGuessLeagueRepository = require('../../repositories/guessLeagues/quitGuessLeagueRepository')

const quitGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers.token, dictionary)
  payload.userRef = session.userRef

  return quitGuessLeagueRepository(payload, dictionary)
}

module.exports = quitGuessLeague