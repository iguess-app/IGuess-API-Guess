'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')
const { verifyUserAtGuessLineRepository, getChampionshipAtGuessLineRepository, createGuessLeagueRepository } = require('../../repositories')
const getUsersPontuationsByGuessLeague = require('./commonFunctions/getUsersPontuationsByGuessLeague')
const orderUsersArrayByPontuation = require('./commonFunctions/orderUsersArrayByPontuation')
const translateChampionship = require('./commonFunctions/translateChampionship')

const selectLanguage = coincidents.Translate.gate.selectLanguage
const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const createGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)  
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  _checkIfThereAreDuplicatedUserRefInvited(payload.userRefInviteads, dictionary, payload.userRef)
  
  return verifyUserAtGuessLineRepository(payload, dictionary)
    .then(() => getChampionshipAtGuessLineRepository(payload, dictionary))
    .then((championship) => createGuessLeagueRepository(payload, championship, dictionary))
    .then((guessesLeagues) => translateChampionship(guessesLeagues, dictionary))
    .then((guessesLeagues) => getUsersPontuationsByGuessLeague(guessesLeagues))
    .then((guessesLeagues) => orderUsersArrayByPontuation(guessesLeagues))
}

const _checkIfThereAreDuplicatedUserRefInvited = (userRefInviteads, dictionary, userRefCreator) => {
  const thereAreDuplicated = userRefInviteads.some((userRefInvited, currentIndex) => userRefInviteads.indexOf(userRefInvited) !== currentIndex)
  const admInvitingHimself = userRefInviteads.some((userRefInvited) => userRefInvited === userRefCreator)
  if (thereAreDuplicated || admInvitingHimself) {
    throw boom('notAcceptable', dictionary.userRefDuplicated, errorCode.userRefDuplicated)
  }
}

module.exports = createGuessLeague