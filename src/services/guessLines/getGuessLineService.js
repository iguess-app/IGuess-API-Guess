'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment')
const Promise = require('bluebird')

const cacheManager = coincidents.Managers.cacheManager
const selectLanguage = coincidents.Translate.gate.selectLanguage
const config = coincidents.Config

const getPontuationsRepository = require('../../repositories/guessLines/getPontuationsRepository')
const getPredictionsRepository = require('../../repositories/guessLines/getPredictionsRepository')
const getGuessLineRepository = require('../../repositories/guessLines/getGuessLineRepository')
const getSomeMatchDayRepository = require('../../repositories/holi/getLastRoundRepository')

const getGuessLine = (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  moment.locale(headers.language)

  return getGuessLineRepository(request, dictionary)
    .then((guessLine) => _getPontuationAndSomeMatchDay(guessLine, request, dictionary))
    .then((pontuationAndMatchDayAndGuessLine) => _getPredictionPerMatchAndBuildMatchObj(pontuationAndMatchDayAndGuessLine, request, dictionary))
    .then((promiseAllObj) => _buildResponseObj(promiseAllObj))
}

const _getPontuationAndSomeMatchDay = (guessLine, request, dictionary) => 
  cacheManager.get(_buildPageCacheKey(request, guessLine))
    .then((cacheData) => {
      const repositoriesObj = {
        championshipRef: guessLine.championship.championshipRef,
        userRef: request.userRef,
        page: request.page,
        currentDateUserPage: cacheData ? cacheData.currentDateUserPage : null
      }

      return Promise.all([
        getPontuationsRepository(repositoriesObj),
        getSomeMatchDayRepository(repositoriesObj, dictionary), 
        guessLine])
    })


const _getPredictionPerMatchAndBuildMatchObj = (pontuationAndMatchDayAndGuessLine, request, dictionary) => {
  const userPontuation = pontuationAndMatchDayAndGuessLine[0]
  const matchDay = pontuationAndMatchDayAndGuessLine[1]
  const guessLine = pontuationAndMatchDayAndGuessLine[2]
  const matchDayDate = _buildMatchDayDate(matchDay)
  _setPaginationOnCache(matchDay, request, guessLine)

  const predictionsPromiseArray = _buildPredictionsPromiseArray(matchDay, request.userRef, dictionary)
  const games = _getMatchesArrayWithPredictionsAndResults(predictionsPromiseArray)

  return Promise.all([games, guessLine, userPontuation, matchDayDate])
}

const _getMatchesArrayWithPredictionsAndResults = (predictionsPromiseArray) => 
  Promise.map(predictionsPromiseArray, (matchAndPrediction) => {
    const prediction = matchAndPrediction[0]
    const match = matchAndPrediction[1]

     const matchObj = {
      matchRef: match._id.toString(),
      homeTeamScore: match.homeTeamScore,
      awayTeamScore: match.awayTeamScore,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam
    }
    if (prediction) {
      matchObj.awayTeamScoreGuess = prediction.guess.awayTeamScoreGuess
      matchObj.homeTeamScoreGuess = prediction.guess.homeTeamScoreGuess
      if (prediction.matchPontuation) {
        matchObj.matchPontuation = prediction.matchPontuation
      }
    }

    return matchObj
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
    date: matchDayDate,
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

const _setPaginationOnCache = (matchDay, request, guessLine) => {
  const paginationData = {
    currentDateUserPage: matchDay.unixDate
  }
  cacheManager.set(_buildPageCacheKey(request, guessLine), paginationData, config.redis.sessionTime)
}

const PAGE_KEY_SUFFIX = 'roundPage'
const _buildPageCacheKey = (request, guessLine) => request.userRef + guessLine.championship.championshipRef + PAGE_KEY_SUFFIX
const _buildMatchDayDate = (matchDay) => `${moment(matchDay.unixDate, 'X').format('DD/MM')}, ${moment(matchDay.unixDate, 'X').format('dddd')}`

module.exports = getGuessLine

/*eslint no-magic-numbers: 0*/


//TODO: Added JSDoc to all this functions
//TODO: Fazer teste com prediction=undefined