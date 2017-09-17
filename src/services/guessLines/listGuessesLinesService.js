'use strict';

const Promise = require('bluebird')

module.exports = (app) => {
  const listGuessesLinesRepository = app.src.repositories.guessLines.listGuessesLinesRepository
  const getPontuationsRepository = app.src.repositories.guessLines.getPontuationsRepository

  const listGuessesLines = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return listGuessesLinesRepository.listGuessesLines(request, dictionary)
      .then((list) => _checkIfPontuationWillReturnsToo(list, request))
  }

  const _checkIfPontuationWillReturnsToo = (list, request) => {
    if (request.showPontuation === false) {
      return list
    }

    const getPontuationArrayPromise = list.map((guessLine) => {

      return getPontuationsRepository.getPontuations(request, guessLine)
        .then((pontuationDoc) => {
          if (pontuationDoc) {
            guessLine._doc.pontuation = pontuationDoc.totalPontuation
          }

          return guessLine
        })
    })

    return Promise.map(getPontuationArrayPromise, (r) => r)
  }

  return {
    listGuessesLines
  }
}