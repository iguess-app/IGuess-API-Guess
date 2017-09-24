'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const createGuessLeagueRepository = app.src.repositories.guessLeagues.createGuessLeagueRepository
  const getChampionshipAtGuessLineRepository = app.src.repositories.guessLines.getChampionshipAtGuessLineRepository
  const verifyUserAtGuessLineRepository = app.src.repositories.guessLines.verifyUserAtGuessLineRepository

  const createGuessLeague = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    _checkIfThereAreDuplicatedUserRefInvited(payload.userRefInviteads, dictionary)

    return verifyUserAtGuessLineRepository(payload, dictionary)
      .then(() => getChampionshipAtGuessLineRepository(payload, dictionary))
      .then((championship) => createGuessLeagueRepository(payload, championship, dictionary))
  }

  return {
    createGuessLeague
  }
}

const _checkIfThereAreDuplicatedUserRefInvited = (userRefInviteads, dictionary) => {
  const thereAreDuplicated = userRefInviteads.some((userRefInvited, currentIndex) => userRefInviteads.indexOf(userRefInvited) !== currentIndex)
  if (thereAreDuplicated) {
    throw Boom.notAcceptable(dictionary.userRefDuplicated)
  }
}