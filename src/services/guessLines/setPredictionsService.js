'use strict';

const Boom = require('boom')
const Promise = require('bluebird')
const moment = require('moment')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const { getMatchByRefRepository, setPredictionsRepository } = require('../../repositories')

const setPredictions = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  _checkIfThereAreDuplicatedMatchRef(request.guesses, dictionary)
  const session = await sessionManager.getSession(headers.token, dictionary)
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
    const matchOneHourAgoUnixDate = Number(moment(guess.initTime).subtract('1', 'hour').format('x'))
    return nowUnixDate < matchOneHourAgoUnixDate
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

module.exports = setPredictions