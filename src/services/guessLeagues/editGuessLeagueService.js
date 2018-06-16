'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const editGuessLeagueRepository = require('../../repositories/guessLeagues/editGuessLeagueRepository')
const translateChampionship = require('./commonFunctions/translateChampionship')

const editGuessLeagues = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  const editedGuessLeague = await editGuessLeagueRepository(payload, dictionary)
  return translateChampionship(editedGuessLeague, dictionary)
}

module.exports = editGuessLeagues