'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')
const inviteToGuessLeagueRepository = require('../../repositories/guessLeagues/inviteToGuessLeagueRepository')
const verifyUserAtGuessLineRepository = require('../../repositories/guessLines/verifyUserAtGuessLineRepository')

const selectLanguage = coincidents.Translate.gate.selectLanguage
const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const inviteToGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  _checkIfThereAreDuplicatedUserRefInvited(payload.userRefInviteads, dictionary)

  return verifyUserAtGuessLineRepository(payload, dictionary)
    .then(() => inviteToGuessLeagueRepository(payload, dictionary))
}

const _checkIfThereAreDuplicatedUserRefInvited = (userRefInviteads, dictionary) => {
  const thereAreDuplicated = userRefInviteads.some((userRefInvited, currentIndex) => userRefInviteads.indexOf(userRefInvited) !== currentIndex)
  if (thereAreDuplicated) {
    throw boom('notAcceptable', dictionary.userRefDuplicated, errorCode.userRefDuplicated)
  }
}

module.exports = inviteToGuessLeague