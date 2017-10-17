'use strict'

const coincidents = require('iguess-api-coincidents')
const selectLanguage = coincidents.Translate.gate.selectLanguage

const moment = require('moment')
const Promise = require('bluebird')

const getPontuationsRepository = require('../../repositories/guessLines/getPontuationsRepository')
const getPredictionsRepository = require('../../repositories/guessLines/getPredictionsRepository')
const getGuessLineRepository = require('../../repositories/guessLines/getGuessLineRepository')
const getLastRoundRepository = require('../../repositories/holi/getLastRoundRepository')

const getGuessLine = (request, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getGuessLineRepository(request, dictionary)
    .then((guessLine) => {
      const getLastRoundObj = {
        championshipRef: guessLine.championship.championshipRef,
        userRef: request.userRef
      }
      return Promise.all([
        getPontuationsRepository(getLastRoundObj),
        getLastRoundRepository(getLastRoundObj), 
        guessLine])
    })
    .then((guessLineAndlastRound) => {
      const userPontuation = guessLineAndlastRound[0]
      const lastRound = guessLineAndlastRound[1]
      const guessLine = guessLineAndlastRound[2]
      const matchDayDate = moment(lastRound.unixDate, 'X').format('DD/MM/YYYY')
      const arrayPromise = lastRound.games.map((match) => {
        const obj = {
          userRef: request.userRef,
          matchRef: match._id.toString()
        }
        return Promise.all([
          getPredictionsRepository.getPredictions(obj, dictionary),
          match
        ])
      })

      const games = Promise.map(arrayPromise, (matchAndPrediction) => {
        const prediction = matchAndPrediction[0]
        const match = matchAndPrediction[1]
        //TODO: verificar se alguns campos existir antes de inserir no obj

        return {
          matchRef: prediction.matchRef,
          gamePontuation: prediction.matchPontuation,
          homeTeamScore: match.homeTeamScore,
          awayTeamScore: match.awayTeamScore,
          homeTeamScoreGuess: prediction.guess.homeTeamScoreGuess,
          awayTeamScoreGuess: prediction.guess.awayTeamScoreGuess,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam
        }
      })

      return Promise.all([games, guessLine, userPontuation, matchDayDate])
    })
    .then((obj) => {
      const guessLine = obj[1]
      const userPontuation = obj[2]
      const matchDayDate = obj[3]

      return {
        championshipRef: guessLine.championship.championshipRef,
        guessLinePontuation: userPontuation.totalPontuation,
        matchDayPontuation: userPontuation.pontuationByMatchDay.find((matchDayPontuation) => matchDayPontuation.day === matchDayDate).pontuation,
        games: obj[0]
      }

    })

}

const _buildGamesArray = (predictions) => predictions.map((prediction) => {

  })
module.exports = getGuessLine

//TODO: Seguir passos:
//se nao tiver nada
//buscar alguma guessLine que o user esteja inserido
//getLastRound
//getPrediction daquelas matchIDs

//se tiver championshipId:
//getLastRound
//getPrediction daquelas matchIDs

//TODO: trocar nomenclatura de lastRound para nextMatchDay