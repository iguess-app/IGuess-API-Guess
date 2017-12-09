'use strict'

const Promise = require('bluebird')

const { getPredictionsRepository } = require('../../../repositories')

const getUsersPontuationsByGuessLeague = (guessLeague) => {
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

module.exports = getUsersPontuationsByGuessLeague