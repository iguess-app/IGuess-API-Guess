'use strict';

const Promise = require('bluebird')

module.exports = (app) => {
  const getPontuationsRepository = app.src.repositories.guessLines.getPontuationsRepository
  const holiRepository = app.src.repositories.holi.holiRepository
  const getPredictionsRepository = app.src.repositories.guessLines.getPredictionsRepository

  const getGuessLine = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    
    //TODO
    //Pegar primeiro um guessLine activo (qualquer) do usuario, 
    //daí pegar a pontuation dele com isso a ultima rodada inserida,
    //dai pegar a fixtura no Holi e as predictions no banco daqui,
    //dai juntar todas match via matchID e devolver = )

    return getPontuationsRepository.getPontuations(request, dictionary)
    .then((userGuessLinesPontuations) => _getLastRoundSentByTheUser(userGuessLinesPontuations))
    .then((repositoriesResponses) => _joinMatchResultWithPredictions(repositoriesResponses))
  }

  const _getLastRoundSentByTheUser = (userGuessLinesPontuations) => {
    const getFixtureAndPredictionsByPontuationsFound = userGuessLinesPontuations.map((userGuessLinePontuations) => {
      const lastRoundSentByTheUser = userGuessLinePontuations.pontuationByFixture[userGuessLinePontuations.pontuationByFixture.length - 1]
      const request = {
        userRef: userGuessLinePontuations.userRef,
        championshipRef: userGuessLinePontuations.championshipRef,
        fixture: lastRoundSentByTheUser.fixture
      }

      return Promise.all([
        getPredictionsRepository.getUniqueChampionshipPredictions(request), 
        holiRepository.getFixtureByChampionshipRefAndFixture(request)
      ])
    })


    return Promise.map(getFixtureAndPredictionsByPontuationsFound, (ff) => ff) 
  }

  const _joinMatchResultWithPredictions = (repositoriesResponses) => {
    const predictions = repositoriesResponses[0]
    const fixture = repositoriesResponses[1]

    return repositoriesResponses
  }

  return {
    getGuessLine
  }
}

/*eslint no-magic-numbers: 0*/