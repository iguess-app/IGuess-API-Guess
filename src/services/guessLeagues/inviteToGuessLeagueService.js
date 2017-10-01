'use strict'

const Boom = require('boom')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const inviteToGuessLeagueRepository = require('../../repositories/guessLeagues/inviteToGuessLeagueRepository')
const verifyUserAtGuessLineRepository = require('../../repositories/guessLines/verifyUserAtGuessLineRepository')

const inviteToGuessLeague = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  _checkIfThereAreDuplicatedUserRefInvited(payload.userRefInviteads, dictionary)

  return verifyUserAtGuessLineRepository(payload, dictionary)
    .then(() => inviteToGuessLeagueRepository(payload, dictionary))
}

const _checkIfThereAreDuplicatedUserRefInvited = (userRefInviteads, dictionary) => {
  const thereAreDuplicated = userRefInviteads.some((userRefInvited, currentIndex) => userRefInviteads.indexOf(userRefInvited) !== currentIndex)
  if (thereAreDuplicated) {
    throw Boom.notAcceptable(dictionary.userRefDuplicated)
  }
}

module.exports = inviteToGuessLeague