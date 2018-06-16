'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const { getGuessLeagueRepository } = require('../../repositories')
const getUsersPontuationsByGuessLeague = require('./commonFunctions/getUsersPontuationsByGuessLeague')
const orderUsersArrayByPontuation = require('./commonFunctions/orderUsersArrayByPontuation')
const translateChampionship = require('./commonFunctions/translateChampionship')

const getGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  return getGuessLeagueRepository(payload, dictionary)
    .then((guessesLeagues) => translateChampionship(guessesLeagues, dictionary))
    .then((guessesLeagues) => getUsersPontuationsByGuessLeague(guessesLeagues))
    .then((guessesLeagues) => orderUsersArrayByPontuation(guessesLeagues))
}

module.exports = getGuessLeague