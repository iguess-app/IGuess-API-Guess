'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment')
const Promise = require('bluebird')

const selectLanguage = coincidents.Translate.gate.selectLanguage

const getPontuationsRepository = require('../../repositories/guessLines/getPontuationsRepository')
const getPredictionsRepository = require('../../repositories/guessLines/getPredictionsRepository')
const getGuessLineRepository = require('../../repositories/guessLines/getGuessLineRepository')
const getSomeNearMatchDayRepository = require('../../repositories/holi/getLastRoundRepository')

const getGuessLine = (request, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getGuessLineRepository(request, dictionary)
    .then((guessLine) => _getPontuationAndSomeNearMatchDay(guessLine, request, dictionary))
    .then((pontuationAndMatchDayAndGuessLine) => _getPredictionPerMatchAndBuildMatchObj(pontuationAndMatchDayAndGuessLine, request, dictionary))
    .then((promiseAllObj) => _buildResponseObj(promiseAllObj))

}

const _getPontuationAndSomeNearMatchDay = (guessLine, request, dictionary) => {
  const repositoriesObj = {
    championshipRef: guessLine.championship.championshipRef,
    userRef: request.userRef
  }
  return Promise.all([
    getPontuationsRepository(repositoriesObj, dictionary),
    getSomeNearMatchDayRepository(repositoriesObj, dictionary), 
    guessLine])
}

const _getPredictionPerMatchAndBuildMatchObj = (pontuationAndMatchDayAndGuessLine, request, dictionary) => {
  const userPontuation = pontuationAndMatchDayAndGuessLine[0]
  const matchDay = pontuationAndMatchDayAndGuessLine[1]
  const guessLine = pontuationAndMatchDayAndGuessLine[2]
  const matchDayDate = moment(matchDay.unixDate, 'X').format('DD/MM/YYYY')

  const predictionsPromiseArray = _buildPredictionsPromiseArray(matchDay, request.userRef, dictionary)

  const games = _getMatchesArrayWithPredictionsAndResults(predictionsPromiseArray)

  return Promise.all([games, guessLine, userPontuation, matchDayDate])
}

const _getMatchesArrayWithPredictionsAndResults = (predictionsPromiseArray) => 
  Promise.map(predictionsPromiseArray, (matchAndPrediction) => {
    const prediction = matchAndPrediction[0]
    const match = matchAndPrediction[1]
    //TODO: verificar se alguns campos existir antes de inserir no obj
    //TODO: Fazer teste com prediction=undefined

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

const _buildPredictionsPromiseArray = (matchDay, userRef, dictionary) => 
  matchDay.games.map((match) => {
    const obj = {
      userRef,
      matchRef: match._id.toString()
    }
    return Promise.all([
      getPredictionsRepository.getPredictions(obj, dictionary),
      match
    ])
  })


const _buildResponseObj = (promiseAllObj) => {
  const games = promiseAllObj[0]
  const guessLine = promiseAllObj[1]
  const userPontuation = promiseAllObj[2]
  const matchDayDate = promiseAllObj[3]

  const responseObj = {
    championshipRef: guessLine.championship.championshipRef,
    guessLinePontuation: userPontuation.totalPontuation,
    matchDayPontuation: _getMatchDayPontuation(matchDayDate, userPontuation),
    games
  }

  return responseObj
}

const _getMatchDayPontuation = (matchDayDate, userPontuation) => {
  //TODO: Fazer teste com pontuation not found
  //TODO: Fazer teste com pontuation found
  const MATCH_DAY_NOT_FOUND_PONTUATION = 0
  const matchDayFound = userPontuation.pontuationByMatchDay.find((matchDayObj) => matchDayObj.day === matchDayDate)
  if (matchDayFound) {
    return matchDayFound.pontuation
  }
  return MATCH_DAY_NOT_FOUND_PONTUATION
}

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


/*eslint no-magic-numbers: 0*/


//TODO: Added JSDoc to all this functions