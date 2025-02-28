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
const DEFAULT_ZERO = 0

const getGuessLine = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  request.userRef = session.userRef

  return getGuessLineRepository(request, dictionary)
    .then((guessLine) => _translateTheChampionshipName(guessLine, dictionary))
    .then((guessLine) => _getMatches(guessLine, request, dictionary))
    .then((pontuationAndMatchDayAndGuessLine) => _getPredictionPerMatchAndBuildMatchObj(pontuationAndMatchDayAndGuessLine, request, dictionary))
    .then((promiseAllObj) => _buildResponseObj(promiseAllObj, dictionary, request))
}

const _translateTheChampionshipName = (guessLine, dictionary) => {
  guessLine.championship.championship = dictionary[guessLine.championship.translateFlag]
  return guessLine
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
  const hasPastMatchDays = pontuationAndMatchesAndGuessLine[0].hasPastMatchDays
  const matches = pontuationAndMatchesAndGuessLine[0].matches
  const guessLine = pontuationAndMatchesAndGuessLine[1]

  const predictionsPromiseArray = _buildPredictionsPromiseArray(matches, request.userRef, dictionary)
  const games = _getMatchesArrayWithPredictionsAndResults(predictionsPromiseArray, request, dictionary)

  const filter = {
    userRef: request.userRef,
    championshipRef: guessLine.championship.championshipRef
  }
  const totalPontuation = getPredictionsRepository.getTotalPontuation(filter)
  const matchesPontuation = getPredictionsRepository.getPontuationByUnixDate(filter)

  return Promise.all([games, guessLine, totalPontuation, matchesPontuation, matchDay, hasPastMatchDays])
}

const _getMatchesArrayWithPredictionsAndResults = (predictionsPromiseArray, request, dictionary) => 
  Promise.map(predictionsPromiseArray, (matchAndPrediction) => {
    const prediction = matchAndPrediction[0]
    const match = matchAndPrediction[1]
    match.homeTeam.shortName = _getTranslatedNameIfExists(match.homeTeam, dictionary)
    match.awayTeam.shortName = _getTranslatedNameIfExists(match.awayTeam, dictionary)

     const matchObj = {
      matchRef: match.matchRef,
      homeTeamScore: match.homeTeamScore,
      awayTeamScore: match.awayTeamScore,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      ended: match.ended,
      started: match.started,
      minutes: match.minutes,
      percentageCompleted: match.percentageCompleted,
      initTimeIsoDate: dateManager.getDate(match.initTime, '', '', request.userTimezone),
      initTimeHumanified: _getInitTimeHumanified(match.initTime, request.userTimezone),
      allowToPredict: _checkIfAllowPredict(match.initTime),
      matchPontuation: DEFAULT_ZERO
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
  const hasPastMatchDays = promiseAllObj[5]

  const responseObj = {
    games,
    hasPastMatchDays,
    matchDayPontuation,
    matchDayIsoDate,
    championship: guessLine.championship.toObject(),
    guessLinePontuation: totalPontuation,
    matchDayHumanified: _buildMatchDayLikeHumanDate(matchDayIsoDate, dictionary, request.userTimezone)
  }

  return responseObj
}

const _checkIfAllowPredict = (initTime) => 
  moment()
    .add(MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH, MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT)
    .isBefore(moment(initTime)) 

const _buildMatchDayLikeHumanDate = (matchDayIsoDate, dictionary, userTimezone) => {
  const subInfoDate = _getSubInfoDate(matchDayIsoDate, dictionary, userTimezone)
  const nickname = dateManager.getNicknameDay(userTimezone, matchDayIsoDate)

  if (nickname) {
    return {
      mainInfoDate: dictionary[nickname],
      subInfoDate
    }
  }
  
  return {
    mainInfoDate: _getHowManyDaysLeftToMatchDay(matchDayIsoDate, dictionary),
    subInfoDate
  }
}

const _getInitTimeHumanified = (initTime, userTimezone) => `${dateManager.getDate(initTime, '', 'HH', userTimezone)}H ${dateManager.getDate(initTime, '', 'mm', userTimezone)}M`

const _getSubInfoDate = (matchDayIsoDate, dictionary, userTimezone) => {
  const day = dateManager.getDate(matchDayIsoDate, '', 'DD', userTimezone, dictionary.language)
  const month = dateManager.getDate(matchDayIsoDate, '', 'MMMM', userTimezone, dictionary.language)
  const weekDay = dateManager.getDate(matchDayIsoDate, '', 'dddd', userTimezone, dictionary.language)

  return dictionary.subInfoDateAtMatchDay
    .replace('{{day}}', day)
    .replace('{{month}}', month)
    .replace('{{weekDay}}', weekDay)
}

const _getHowManyDaysLeftToMatchDay = (matchDayIsoDate, dictionary) => {
  const diffFromMatchDaytoToday = moment(matchDayIsoDate).diff(moment(), 'days')
  
  if (_matchDayIsOnTheFuture(diffFromMatchDaytoToday)) {
    return dictionary.daysLeftForTheMatchDay.replace('{{days}}', diffFromMatchDaytoToday + 1)
  }

  const numberOfDaysAgo = Math.abs(diffFromMatchDaytoToday)
  return dictionary.daysAgoOnTheMatchDay.replace('{{days}}', numberOfDaysAgo)
}

const _matchDayIsOnTheFuture = (days) => days >= 0

const _getTranslatedNameIfExists = (teamObj, dictionary) => {
  const translatedName = dictionary[teamObj.translateFlag]
  if (translatedName) {
    return translatedName
  }
  return teamObj.shortName
}

module.exports = getGuessLine

/*eslint no-magic-numbers: 0*/
/*eslint max-statements: 0*/