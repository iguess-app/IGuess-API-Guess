'use strict';

const Boom = require('boom')

module.exports = (app) => {
  const setPredictionsRepository = app.src.repositories.guessLines.setPredictionsRepository

  const setPredictions = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    _checkIfThereAreDuplicatedMatchRef(request.guesses, dictionary)

    return setPredictionsRepository.setPredictions(request, dictionary)
  }

  const _checkIfThereAreDuplicatedMatchRef = (guesses, dictionary) => {
    const matchRefArray = guesses.map((guess) => guess.matchRef)
    const thereAreDuplicated = matchRefArray.some((matchRef, currentIndex) => matchRefArray.indexOf(matchRef) !== currentIndex)
    if (thereAreDuplicated) {
      throw Boom.notAcceptable(dictionary.matchDuplicated)
    }
  }

  return {
    setPredictions
  }
}