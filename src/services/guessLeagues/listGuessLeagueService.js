'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const listGuessLeagueRepository = require('../../repositories/guessLeagues/listGuessLeagueRepository')
const translateChampionship = require('./commonFunctions/translateChampionship')

const listGuessLeagues = async (headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)

  const guessLeagueObj = await listGuessLeagueRepository(session, dictionary)
  guessLeagueObj.guessLeaguesList = guessLeagueObj.guessLeaguesList.map((guessLeague) => translateChampionship(guessLeague, dictionary))

  return guessLeagueObj
}

module.exports = listGuessLeagues