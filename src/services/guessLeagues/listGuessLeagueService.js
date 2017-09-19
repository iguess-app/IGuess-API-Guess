'use strict'

const Promise = require('bluebird')

module.exports = (app) => {
  const listGuessLeagueRepository = app.src.repositories.guessLeagues.listGuessLeagueRepository
  const getPontuationsRepository = app.src.repositories.guessLines.getPontuationsRepository

  const listGuessLeagues = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return listGuessLeagueRepository.listGuessLeagues(payload, dictionary)
      .then((guessesLeagues) => _getUsersPontuationsByGuessLeague(guessesLeagues, getPontuationsRepository))
      .then((guessesLeagues) => _orderUsersArrayByPontuation(guessesLeagues))
  }

  return {
    listGuessLeagues
  }
}

const _getUsersPontuationsByGuessLeague = (guessesLeagues, getPontuationsRepository) => {
  const guessesLeaguesArrayPromise = guessesLeagues.map((guessLeague) => {
    const getPontuationArrayPromise = guessLeague.players.map((userRef) => {
      const pontuationObj = {
        championshipRef: guessLeague.championship.championshipRef,
        userRef
      }

      return getPontuationsRepository.getPontuations(pontuationObj)
        .then((userPontuation) => _joiPontuationAtGuessLeagueObj(userPontuation, userRef))
    })

    return Promise.map(getPontuationArrayPromise, (justReturn) => justReturn)
      .then((playersArray) => _addPlayersArrayToGuessLeague(guessLeague, playersArray))
  })

  return Promise.map(guessesLeaguesArrayPromise, (justReturn) => justReturn)
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

const _orderUsersArrayByPontuation = (guessesLeagues) =>
  guessesLeagues.map((guessLeague) => {
    guessLeague.players.sort((playerA, playerB) => playerB.totalPontuation - playerA.totalPontuation)

    return guessLeague
  })