'use strict'

const Promise = require('bluebird')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const { getPredictionsRepository, getGuessLeagueRepository } = require('../../repositories')

const getGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers.token, dictionary)
  payload.userRef = session.userRef

  return getGuessLeagueRepository(payload, dictionary)
    .then((guessesLeagues) => _getUsersPontuationsByGuessLeague(guessesLeagues))
    .then((guessesLeagues) => _orderUsersArrayByPontuation(guessesLeagues))
}

const _getUsersPontuationsByGuessLeague = (guessLeague) => {
  const getPontuationArrayPromise = guessLeague.players.map((userRef) => {
    const filter = {
      championshipRef: guessLeague.championship.championshipRef,
      userRef
    }

    return getPredictionsRepository.getTotalPontuation(filter)
      .then((userPontuation) => _joiPontuationAtGuessLeagueObj(userPontuation, userRef))
  })

  return Promise.map(getPontuationArrayPromise, (justReturn) => justReturn)
    .then((playersArray) => _addPlayersArrayToGuessLeague(guessLeague, playersArray))
}

const _joiPontuationAtGuessLeagueObj = (userPontuation, userRef) => {

  return {
    userRef,
    totalPontuation: userPontuation
  }
}

const _addPlayersArrayToGuessLeague = (guessLeague, playersArray) => {
  guessLeague.players = playersArray

  return guessLeague
}

const _orderUsersArrayByPontuation = (guessLeague) => {
  guessLeague.players.sort((playerA, playerB) => playerB.totalPontuation - playerA.totalPontuation)

  return guessLeague
}

module.exports = getGuessLeague