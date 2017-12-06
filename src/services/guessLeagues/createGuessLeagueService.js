'use strict'

const Boom = require('boom')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const createGuessLeagueRepository = require('../../repositories/guessLeagues/createGuessLeagueRepository')
const getChampionshipAtGuessLineRepository = require('../../repositories/guessLines/getChampionshipAtGuessLineRepository')
const verifyUserAtGuessLineRepository = require('../../repositories/guessLines/verifyUserAtGuessLineRepository')

const createGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers.token, dictionary)
  payload.userRef = session.userRef
  _checkIfThereAreDuplicatedUserRefInvited(payload.userRefInviteads, dictionary, payload.userRef)

  return verifyUserAtGuessLineRepository(payload, dictionary)
    .then(() => getChampionshipAtGuessLineRepository(payload, dictionary))
    .then((championship) => createGuessLeagueRepository(payload, championship, dictionary))
}

const _checkIfThereAreDuplicatedUserRefInvited = (userRefInviteads, dictionary, userRefCreator) => {
  const thereAreDuplicated = userRefInviteads.some((userRefInvited, currentIndex) => userRefInviteads.indexOf(userRefInvited) !== currentIndex)
  const admInvitingHimself = userRefInviteads.some((userRefInvited) => userRefInvited === userRefCreator)
  if (thereAreDuplicated || admInvitingHimself) {
    throw Boom.notAcceptable(dictionary.userRefDuplicated)
  }
}

module.exports = createGuessLeague