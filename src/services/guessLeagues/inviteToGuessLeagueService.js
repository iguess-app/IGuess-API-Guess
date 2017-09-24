'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const inviteToGuessLeagueRepository = app.src.repositories.guessLeagues.inviteToGuessLeagueRepository
  const verifyUserAtGuessLineRepository = app.src.repositories.guessLines.verifyUserAtGuessLineRepository

  const inviteToGuessLeague = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    _checkIfThereAreDuplicatedUserRefInvited(payload.userRefInviteads, dictionary)

    return verifyUserAtGuessLineRepository(payload, dictionary)
      .then(() => inviteToGuessLeagueRepository(payload, dictionary))
      .catch((err) => err)
  }

  return inviteToGuessLeague
}

const _checkIfThereAreDuplicatedUserRefInvited = (userRefInviteads, dictionary) => {
  const thereAreDuplicated = userRefInviteads.some((userRefInvited, currentIndex) => userRefInviteads.indexOf(userRefInvited) !== currentIndex)
  if (thereAreDuplicated) {
    throw Boom.notAcceptable(dictionary.userRefDuplicated)
  }
}