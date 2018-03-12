'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment')
const Promise = require('bluebird')

const sessionManager = require('../../managers/sessionManager')
const { getPredictionsRepository, getGuessLineRepository, getLastRoundRepository } = require('../../repositories')

const { cacheManager, dateManager } = coincidents.Managers
const selectLanguage = coincidents.Translate.gate.selectLanguage
const config = coincidents.Config

const MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH = config.guess.maxTimeToSendPredictBeforeTheMatch.value
const MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT = config.guess.maxTimeToSendPredictBeforeTheMatch.unit
const PAGE_KEY_SUFFIX = 'roundPage'

const getGuessLine = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  request.userRef = session.userRef

  return getGuessLineRepository(request, dictionary)
    .then((guessLine) => _getPontuationAndSomeMatchDay(guessLine, request, dictionary))
    .then((pontuationAndMatchDayAndGuessLine) => _getPredictionPerMatchAndBuildMatchObj(pontuationAndMatchDayAndGuessLine, request, dictionary))
    .then((promiseAllObj) => _buildResponseObj(promiseAllObj, headers.language))
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
      ended: match.ended,
      started: match.started,
      minutes: match.minutes,
      initHour: _getInitTimeHour(match.initTime),
      allowToPredict: _checkIfAllowPredict(match.initTime)
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


const _buildResponseObj = (promiseAllObj, language) => {
  const games = promiseAllObj[0]
  const guessLine = promiseAllObj[1]
  const matchDay = promiseAllObj[2]
  const totalPontuation = promiseAllObj[3]
  const matchDayPontuation = promiseAllObj[4]

  const responseObj = {
    championship: guessLine.championship.toObject(),
    guessLinePontuation: totalPontuation,
    matchDayPontuation,
    date: _buildMatchDayLikeHumanDate(matchDay, language),
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

const _buildPageCacheKey = (request, guessLine) => request.userRef + guessLine.championship.championshipRef + PAGE_KEY_SUFFIX

const _buildMatchDayLikeHumanDate = (matchDay, language) => {
  const date = dateManager.getUTCDate(matchDay.date, '', 'DD MMMM', language)
  const weekDay = dateManager.getUTCDate(matchDay.date, '', 'dddd', language)

  return `${date}, ${weekDay}`
}

const _getInitTimeHour = (initTime) => {
  const hour = dateManager.getUTCDate(initTime, '', 'HH')
  const min = dateManager.getUTCDate(initTime, '', 'mm')

  return `${hour}h ${min}m`
}

const _checkIfAllowPredict = (initTime) => 
  moment()
    .add(MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH, MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT)
    .isBefore(moment(initTime)) 

module.exports = getGuessLine

/*eslint no-magic-numbers: 0*/