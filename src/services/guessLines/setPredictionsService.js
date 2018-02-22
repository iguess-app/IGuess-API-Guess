'use strict';

const Boom = require('boom')
const Promise = require('bluebird')
const moment = require('moment')
const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')
const { getMatchByRefRepository, setPredictionsRepository } = require('../../repositories')

const selectLanguage = coincidents.Translate.gate.selectLanguage
const config = coincidents.Config

const MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH = config.guess.maxTimeToSendPredictBeforeTheMatch.value
const MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT = config.guess.maxTimeToSendPredictBeforeTheMatch.unit

const setPredictions = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  _checkIfThereAreDuplicatedMatchRef(request.guesses, dictionary)
  const session = await sessionManager.getSession(headers, dictionary)
  request.userRef = session.userRef

  return _joinMatchWithGuess(request, dictionary)
  .then((guessJoinedWithMatch) => { request.guesses = guessJoinedWithMatch })
  .then(() => _checkOneHourRule(request, dictionary))
  .then((predictionsRequestFiltered) => setPredictionsRepository(predictionsRequestFiltered, dictionary))
}

const _checkIfThereAreDuplicatedMatchRef = (guesses, dictionary) => {
  const matchRefArray = guesses.map((guess) => guess.matchRef)
  const thereAreDuplicated = matchRefArray.some((matchRef, currentIndex) => matchRefArray.indexOf(matchRef) !== currentIndex)
  if (thereAreDuplicated) {
    throw Boom.notAcceptable(dictionary.matchDuplicated)
  }
}

const _joinMatchWithGuess = (request, dictionary) => {
  const matchesPromiseArray = request.guesses.map((guess) => {
    guess.championshipRef = request.championshipRef
    return getMatchByRefRepository(guess, dictionary)
      .then((match) => Object.assign(guess, match)) 
  })
    
  return Promise.map(matchesPromiseArray, (justReturn) => justReturn)
}

const _checkOneHourRule = (request, dictionary) => { 
  const nowUnixDate = Number(moment().format('x'))
  const onlyOneHourRuleAccepted = request.guesses.filter((guess) => {
    const oneHourBeforeTheMatchUnixDate = _getOneHourBeforeTheMatchInUnixDate(guess.initTime)
    return nowUnixDate < oneHourBeforeTheMatchUnixDate
  })

  if (!onlyOneHourRuleAccepted.length) {
    throw Boom.unauthorized(dictionary.allMatchesoneHourOff)
  }

  if (request.guesses.length !== onlyOneHourRuleAccepted.length) {
    request.alertMessage = dictionary.someMatchesoneHourOff
  }

  request.guesses = onlyOneHourRuleAccepted
  return request
}

const _getOneHourBeforeTheMatchInUnixDate = (initTime) => 
  Number(moment(initTime)
    .subtract(MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH, MAX_TIME_TO_SEND_PREDICT_BEFORE_THE_MATCH_UNIT)
    .format('x')
  )

module.exports = setPredictions