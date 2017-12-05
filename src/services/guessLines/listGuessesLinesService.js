'use strict'

const Promise = require('bluebird')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const { listGuessesLinesRepository, getPredictionsRepository } = require('../../repositories')

const listGuessesLines = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers.token, dictionary)
  request.userRef = session.userRef

  return listGuessesLinesRepository(request, dictionary)
    .then((list) => _checkIfPontuationWillReturnsToo(list, request))
}

const _checkIfPontuationWillReturnsToo = (list, request) => {
  if (request.showPontuation === false) {
    return list
  }

  const getPontuationArrayPromise = list.map((guessLine) => {
    const filter = {
      userRef: request.userRef,
      championshipRef: guessLine.championship.championshipRef
    }
    return getPredictionsRepository.getTotalPontuation(filter)
  })

  return Promise.map(getPontuationArrayPromise, (pontuation, index) => {
    list[index].pontuation = pontuation
    return list[index]
  })
}

module.exports = listGuessesLines