'use strict'

const Promise = require('bluebird')

module.exports = (app) => {
  const createGuessLeagueRepository = app.src.repositories.guessLeagues.createGuessLeagueRepository
  const getChampionshipAtGuessLineRepository = app.src.repositories.guessLines.getChampionshipAtGuessLineRepository
  const verifyUserAtGuessLineRepository = app.src.repositories.guessLines.verifyUserAtGuessLineRepository

  const createGuessLeague = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return _verifyIfUsersSentIsOnGuessLineList(verifyUserAtGuessLineRepository, payload, dictionary)
      .then(() => getChampionshipAtGuessLineRepository(payload, dictionary))
      .then((championship) => createGuessLeagueRepository(payload, championship, dictionary))
  }

  return {
    createGuessLeague
  }
}

const _verifyIfUsersSentIsOnGuessLineList = (verifyUserAtGuessLineRepository, payload, dictionary) => {
  if (payload.inviteads) {
    const inviteadsCheckArrayPromise = payload.inviteads.map((userRefInvited) => {
      const verifyUserAtGuessLineObj = {
        championshipRef: payload.championshipRef,
        userRef: userRefInvited
      }

      return verifyUserAtGuessLineRepository(verifyUserAtGuessLineObj, dictionary)
    })

    return Promise.map(inviteadsCheckArrayPromise, (justReturn) => justReturn)
  }

  return payload
}