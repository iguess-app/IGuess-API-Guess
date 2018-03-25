'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment-timezone')
const Promise = require('bluebird')

const { pageAliases } = require('../../../config')
const sessionManager = require('../../managers/sessionManager')
const { getPredictionsRepository, getGuessLineRepository, getMatchesRepository } = require('../../repositories')

const { dateManager } = coincidents.Managers
const selectLanguage = coincidents.Translate.gate.selectLanguage
const config = coincidents.Config

const MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH = config.guess.maxTimeToSendPredictBeforeTheMatch.value
const MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT = config.guess.maxTimeToSendPredictBeforeTheMatch.unit

const getGuessLine = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  request.userRef = session.userRef

  return getGuessLineRepository(request, dictionary)
    .then((guessLine) => _getMatches(guessLine, request, dictionary))
    .then((pontuationAndMatchDayAndGuessLine) => _getPredictionPerMatchAndBuildMatchObj(pontuationAndMatchDayAndGuessLine, request, dictionary))
    .then((promiseAllObj) => _buildResponseObj(promiseAllObj, dictionary, request))
}

const _getMatches = (guessLine, request, dictionary) => {
  const repositoriesObj = {
    championshipRef: guessLine.championship.championshipRef,
    userRef: request.userRef,
    page: pageAliases.nearestPage,
    userTimezone: request.userTimezone
  }
  
  if (request.page && request.dateReference) {
    repositoriesObj.page = request.page
    repositoriesObj.dateReference = request.dateReference
  }

  return Promise.all([
    getMatchesRepository(repositoriesObj, dictionary), 
    guessLine])
}

const _getPredictionPerMatchAndBuildMatchObj = (pontuationAndMatchesAndGuessLine, request, dictionary) => {
  const matchDay = pontuationAndMatchesAndGuessLine[0].matchDay
  const matches = pontuationAndMatchesAndGuessLine[0].matches
  const guessLine = pontuationAndMatchesAndGuessLine[1]

  const predictionsPromiseArray = _buildPredictionsPromiseArray(matches, request.userRef, dictionary)
  const games = _getMatchesArrayWithPredictionsAndResults(predictionsPromiseArray, request)

  const filter = {
    userRef: request.userRef,
    championshipRef: guessLine.championship.championshipRef
  }
  const totalPontuation = getPredictionsRepository.getTotalPontuation(filter)
  const matchesPontuation = getPredictionsRepository.getPontuationByUnixDate(filter)

  return Promise.all([games, guessLine, totalPontuation, matchesPontuation, matchDay])
}

const _getMatchesArrayWithPredictionsAndResults = (predictionsPromiseArray, request) => 
  Promise.map(predictionsPromiseArray, (matchAndPrediction) => {
    const prediction = matchAndPrediction[0]
    const match = matchAndPrediction[1]

     const matchObj = {
      matchRef: match.matchRef,
      homeTeamScore: match.homeTeamScore,
      awayTeamScore: match.awayTeamScore,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      ended: match.ended,
      started: match.started,
      minutes: match.minutes,
      initTime: dateManager.getDate(match.initTime, '', '', request.userTimezone),
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

const _buildPredictionsPromiseArray = (maches, userRef, dictionary) => 
  maches.map((match) => {
    const obj = {
      userRef,
      matchRef: match.matchRef
    }
    return Promise.all([
      getPredictionsRepository.getPredictions(obj, dictionary),
      match
    ])
  })


const _buildResponseObj = (promiseAllObj, dictionary, request) => {
  const games = promiseAllObj[0]
  const guessLine = promiseAllObj[1]
  const totalPontuation = promiseAllObj[2]
  const matchDayPontuation = promiseAllObj[3]
  const matchDayIsoDate = promiseAllObj[4]

  const responseObj = {
    championship: guessLine.championship.toObject(),
    guessLinePontuation: totalPontuation,
    matchDayPontuation,
    matchDayIsoDate,
    matchDayHumanified: _buildMatchDayLikeHumanDate(matchDayIsoDate, dictionary, request.userTimezone),
    games
  }

  return responseObj
}

const _checkIfAllowPredict = (initTime) => 
  moment()
    .add(MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH, MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT)
    .isBefore(moment(initTime)) 

const _buildMatchDayLikeHumanDate = (matchDayIsoDate, dictionary, userTimezone) => {
  const date = dateManager.getDate(matchDayIsoDate, '', 'DD/MMMM', userTimezone, dictionary.language)
  const weekDay = dateManager.getDate(matchDayIsoDate, '', 'dddd', userTimezone, dictionary.language)

  const nickname = dateManager.getNicknameDay(userTimezone, matchDayIsoDate)

  if (nickname) {
    return {
      mainInfoDate: dictionary[nickname],
      subInfoDate: `${date}, ${weekDay}`
    }
  }

  return {
    mainInfoDate: date,
    subInfoDate: weekDay
  }
}

module.exports = getGuessLine

/*eslint no-magic-numbers: 0*/