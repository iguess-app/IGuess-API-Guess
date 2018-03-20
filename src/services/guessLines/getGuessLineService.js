'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment')
const Promise = require('bluebird')

const { pageAliases } = require('../../../config')
const sessionManager = require('../../managers/sessionManager')
const { getPredictionsRepository, getGuessLineRepository, getLastRoundRepository } = require('../../repositories')

const selectLanguage = coincidents.Translate.gate.selectLanguage
const config = coincidents.Config

const MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH = config.guess.maxTimeToSendPredictBeforeTheMatch.value
const MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT = config.guess.maxTimeToSendPredictBeforeTheMatch.unit

const getGuessLine = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  request.userRef = session.userRef

  return getGuessLineRepository(request, dictionary)
    .then((guessLine) => _getPontuationAndSomeMatchDay(guessLine, request, dictionary))
    .then((pontuationAndMatchDayAndGuessLine) => _getPredictionPerMatchAndBuildMatchObj(pontuationAndMatchDayAndGuessLine, request, dictionary))
    .then((promiseAllObj) => _buildResponseObj(promiseAllObj))
}

const _getPontuationAndSomeMatchDay = (guessLine, request, dictionary) => {
  const repositoriesObj = {
    championshipRef: guessLine.championship.championshipRef,
    userRef: request.userRef,
    page: pageAliases.greaterEqualPage
  }
  if (request.page && request.pageIndicator) {
    repositoriesObj.page = request.page
    repositoriesObj.pageIndicator = request.pageIndicator
  }

  return Promise.all([
    getLastRoundRepository(repositoriesObj, dictionary), 
    guessLine])
}

const _getPredictionPerMatchAndBuildMatchObj = (pontuationAndMatchDayAndGuessLine, request, dictionary) => {
  const matchDay = pontuationAndMatchDayAndGuessLine[0]
  const guessLine = pontuationAndMatchDayAndGuessLine[1]

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
      initTime: match.initTime,
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


const _buildResponseObj = (promiseAllObj) => {
  const games = promiseAllObj[0]
  const guessLine = promiseAllObj[1]
  const matchDay = promiseAllObj[2]
  const totalPontuation = promiseAllObj[3]
  const matchDayPontuation = promiseAllObj[4]

  const responseObj = {
    championship: guessLine.championship.toObject(),
    guessLinePontuation: totalPontuation,
    matchDayPontuation,
    date: matchDay.date,
    pageIndicator: matchDay.unixDate,
    games
  }

  return responseObj
}

const _checkIfAllowPredict = (initTime) => 
  moment()
    .add(MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH, MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT)
    .isBefore(moment(initTime)) 

module.exports = getGuessLine

/*eslint no-magic-numbers: 0*/