'use strict'

const Promise = require('bluebird')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const listGuessesLinesRepository = require('../../repositories/guessLines/listGuessesLinesRepository')
const getPontuationsRepository = require('../../repositories/guessLines/getPontuationsRepository')

const listGuessesLines = (request, headers) => {
  const dictionary = selectLanguage(headers.language)

  return listGuessesLinesRepository.listGuessesLines(request, dictionary)
    .then((list) => _checkIfPontuationWillReturnsToo(list, request))
}

const _checkIfPontuationWillReturnsToo = (list, request) => {
  if (request.showPontuation === false) {
    return list
  }

  const getPontuationArrayPromise = list.map((guessLine) =>
    getPontuationsRepository.getPontuations(request, guessLine)
    .then((pontuationDoc) => {
      guessLine._doc.pontuation = 0
      if (pontuationDoc) {
        guessLine._doc.pontuation = pontuationDoc.totalPontuation
      }

      return guessLine
    })
  )

  return Promise.map(getPontuationArrayPromise, (justReturn) => justReturn)
}

module.exports = listGuessesLines