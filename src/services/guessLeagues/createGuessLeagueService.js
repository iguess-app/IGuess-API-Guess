'use strict'

const Boom = require('boom')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const { verifyUserAtGuessLineRepository, getChampionshipAtGuessLineRepository, createGuessLeagueRepository } = require('../../repositories')
const getUsersPontuationsByGuessLeague = require('./commonFunctions/getUsersPontuationsByGuessLeague')
const orderUsersArrayByPontuation = require('./commonFunctions/orderUsersArrayByPontuation')

const createGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers.token, dictionary)
  payload.userRef = session.userRef

  _checkIfThereAreDuplicatedUserRefInvited(payload.userRefInviteads, dictionary, payload.userRef)
  
  return verifyUserAtGuessLineRepository(payload, dictionary)
    .then(() => getChampionshipAtGuessLineRepository(payload, dictionary))
    .then((championship) => createGuessLeagueRepository(payload, championship, dictionary))
    .then((guessesLeagues) => getUsersPontuationsByGuessLeague(guessesLeagues))
    .then((guessesLeagues) => orderUsersArrayByPontuation(guessesLeagues))
}

const _checkIfThereAreDuplicatedUserRefInvited = (userRefInviteads, dictionary, userRefCreator) => {
  const thereAreDuplicated = userRefInviteads.some((userRefInvited, currentIndex) => userRefInviteads.indexOf(userRefInvited) !== currentIndex)
  const admInvitingHimself = userRefInviteads.some((userRefInvited) => userRefInvited === userRefCreator)
  if (thereAreDuplicated || admInvitingHimself) {
    throw Boom.notAcceptable(dictionary.userRefDuplicated)
  }
}

module.exports = createGuessLeague