'use strict';

const Boom = require('boom')
const Promise = require('bluebird')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const { getMatchByRefRepository, setPredictionsRepository } = require('../../repositories')

const setPredictions = (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  _checkIfThereAreDuplicatedMatchRef(request.guesses, dictionary)

  return _joinMatchWithGuess(request.guesses, dictionary)
  .then((guessJoinedWithMatch) => { request.guesses = guessJoinedWithMatch })
  .then(() => setPredictionsRepository(request, dictionary))
}

const _checkIfThereAreDuplicatedMatchRef = (guesses, dictionary) => {
  const matchRefArray = guesses.map((guess) => guess.matchRef)
  const thereAreDuplicated = matchRefArray.some((matchRef, currentIndex) => matchRefArray.indexOf(matchRef) !== currentIndex)
  if (thereAreDuplicated) {
    throw Boom.notAcceptable(dictionary.matchDuplicated)
  }
}

const _joinMatchWithGuess = (guesses, dictionary) => {
  const matchesPromiseArray = guesses.map((guess) => 
    getMatchByRefRepository(guess, dictionary)
      .then((match) => 
        Object.assign(guess, match)
      ) 
  )
    
  return Promise.map(matchesPromiseArray, (justReturn) => justReturn)
}

module.exports = setPredictions

//TODO: Travar se a prediction for de menos de 1h pro jogo