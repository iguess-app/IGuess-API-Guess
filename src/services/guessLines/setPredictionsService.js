'use strict';

const Boom = require('boom')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const setPredictionsRepository = require('../../repositories/guessLines/setPredictionsRepository')

const setPredictions = (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  _checkIfThereAreDuplicatedMatchRef(request.guesses, dictionary)

  return setPredictionsRepository(request, dictionary)
}

const _checkIfThereAreDuplicatedMatchRef = (guesses, dictionary) => {
  const matchRefArray = guesses.map((guess) => guess.matchRef)
  const thereAreDuplicated = matchRefArray.some((matchRef, currentIndex) => matchRefArray.indexOf(matchRef) !== currentIndex)
  if (thereAreDuplicated) {
    throw Boom.notAcceptable(dictionary.matchDuplicated)
  }
}

module.exports = setPredictions