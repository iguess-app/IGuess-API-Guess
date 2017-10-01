'use strict'

const Promise = require('bluebird')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getGuessLeagueRepository = require('../../repositories/guessLeagues/getGuessLeagueRepository')
const getPontuationsRepository = require('../../repositories/guessLines/getPontuationsRepository')

const getGuessLeague = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getGuessLeagueRepository(payload, dictionary)
    .then((guessesLeagues) => _getUsersPontuationsByGuessLeague(guessesLeagues))
    .then((guessesLeagues) => _orderUsersArrayByPontuation(guessesLeagues))
}

const _getUsersPontuationsByGuessLeague = (guessLeague) => {
  const getPontuationArrayPromise = guessLeague.players.map((userRef) => {
    const pontuationObj = {
      championshipRef: guessLeague.championship.championshipRef,
      userRef
    }

    return getPontuationsRepository(pontuationObj)
      .then((userPontuation) => _joiPontuationAtGuessLeagueObj(userPontuation, userRef))
  })

  return Promise.map(getPontuationArrayPromise, (justReturn) => justReturn)
    .then((playersArray) => _addPlayersArrayToGuessLeague(guessLeague, playersArray))
}

const _joiPontuationAtGuessLeagueObj = (userPontuation, userRef) => {
  const ZERO_PONTUATION = 0

  return {
    userRef,
    totalPontuation: userPontuation ? userPontuation.totalPontuation : ZERO_PONTUATION
  }
}

const _addPlayersArrayToGuessLeague = (guessLeague, playersArray) => {
  guessLeague._doc.players = playersArray

  return guessLeague
}

const _orderUsersArrayByPontuation = (guessLeague) => {
  guessLeague.players.sort((playerA, playerB) => playerB.totalPontuation - playerA.totalPontuation)

  return guessLeague
}

module.exports = getGuessLeague