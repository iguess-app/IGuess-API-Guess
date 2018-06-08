'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const { addToGuessLeagueRepository } = require('../../repositories/guessLeagues')

const addToGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  //TODO: check duplicates at userToAdd
  //TODO: Grant to the user are at the guessLine

  return addToGuessLeagueRepository(payload, dictionary)
}

module.exports = addToGuessLeague