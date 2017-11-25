'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment')
const Promise = require('bluebird')

const cacheManager = coincidents.Managers.cacheManager
const selectLanguage = coincidents.Translate.gate.selectLanguage
const config = coincidents.Config

const { getPredictionsRepository, getGuessLineRepository, getLastRoundRepository } = require('../../repositories')

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
        getLastRoundRepository(repositoriesObj, dictionary), 
        guessLine])
    })


const _getPredictionPerMatchAndBuildMatchObj = (pontuationAndMatchDayAndGuessLine, request, dictionary) => {
  const matchDay = pontuationAndMatchDayAndGuessLine[0]
  const guessLine = pontuationAndMatchDayAndGuessLine[1]
  _setPaginationOnCache(matchDay, request, guessLine)

  const predictionsPromiseArray = _buildPredictionsPromiseArray(matchDay, request.userRef, dictionary)
  const games = _getMatchesArrayWithPredictionsAndResults(predictionsPromiseArray)

  const filter = {
    userRef: request.userRef,
    unixDate: matchDay.unixDate,
    championshipRef: guessLine.championship.championshipRef
  }
  const totalPontuation = getPredictionsRepository.getTotalPontuation(filter)
  const matchDayPontuation = getPredictionsRepository.getPontuationByUnixDate(filter)

  return Promise.all([games, guessLine, matchDay, totalPontuation, matchDayPontuation])
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
      awayTeam: match.awayTeam,
      ended: match.ended
    }
    if (prediction) {
      matchObj.awayTeamScoreGuess = prediction.guess.awayTeamScoreGuess
      matchObj.homeTeamScoreGuess = prediction.guess.homeTeamScoreGuess
      if (Number.isInteger(prediction.matchPontuation)) {
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
  const matchDay = promiseAllObj[2]
  const totalPontuation = promiseAllObj[3]
  const matchDayPontuation = promiseAllObj[4]

  const responseObj = {
    championshipRef: guessLine.championship.championshipRef,
    guessLinePontuation: totalPontuation,
    matchDayPontuation,
    date: _buildMatchDayLikeHumanDate(matchDay),
    games
  }

  return responseObj
}

const _setPaginationOnCache = (matchDay, request, guessLine) => {
  const paginationData = {
    currentDateUserPage: matchDay.unixDate
  }
  cacheManager.set(_buildPageCacheKey(request, guessLine), paginationData, config.redis.sessionTime)
}

const PAGE_KEY_SUFFIX = 'roundPage'
const _buildPageCacheKey = (request, guessLine) => request.userRef + guessLine.championship.championshipRef + PAGE_KEY_SUFFIX
const _buildMatchDayLikeHumanDate = (matchDay) => `${moment(matchDay.unixDate, 'X').format('DD/MM')}, ${moment(matchDay.unixDate, 'X').format('dddd')}`

module.exports = getGuessLine

/*eslint no-magic-numbers: 0*/


//TODO: Fazer teste com prediction=undefined