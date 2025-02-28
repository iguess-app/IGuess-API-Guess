'use strict'

const Promise = require('bluebird')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const { listUserGuessesLinesRepository, getPredictionsRepository } = require('../../repositories')

const listUserGuessesLines = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  request.userRef = session.userRef

  return listUserGuessesLinesRepository(request, dictionary)
    .then((guessLineList) => _translateTheChampionshipName(guessLineList, dictionary))
    .then((guessLineList) => _checkIfPontuationWillReturnsToo(guessLineList, request))
}

const _translateTheChampionshipName = (guessLineList, dictionary) => 
  guessLineList.map((guessLine) => {
    guessLine.championship.championship = dictionary[guessLine.championship.translateFlag]
    return guessLine
  })

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

module.exports = listUserGuessesLines