'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getPontuationsRepository = require('../../repositories/guessLines/getPontuationsRepository')
const getPredictionsRepository = require('../../repositories/guessLines/getPredictionsRepository')
const getGuessLineRepository = require('../../repositories/guessLines/getGuessLineRepository')
const getFixtureByChampionshipRefAndDateRepository = require('../../repositories/holi/getFixtureByChampionshipRefAndDateRepository')
const getLastRoundRepository = require('../../repositories/holi/getLastRoundRepository')

const getGuessLine = (request, headers) => {
  const dictionary = selectLanguage(headers.language)

  //TODO: Seguir passos:
  //se nao tiver nada
  //buscar alguma guessLine que o user esteja inserido
  //getLastRound
  //getPrediction daquelas matchIDs

  //se tiver championshipId:
  //getLastRound
  //getPrediction daquelas matchIDs


  return getGuessLineRepository(request, dictionary)
    .then((guessLine) => getPontuationsRepository(request, guessLine, dictionary))
    .then((userGuessLinesPontuations) => _getLastRoundSentByTheUser(userGuessLinesPontuations, request, headers.language))
    .then((repositoriesResponses) => _joinMatchResultWithPredictions(repositoriesResponses))
    .catch((err) => err)
}

const _getLastRoundSentByTheUser = (userGuessLinePontuations, request, language) => {
  const searchQueryAndRequestObj = _buildSearchQueryAndRequestObj(request)

  if (_theUserAlreadyHavePontuations(userGuessLinePontuations)) {
    const lastRoundSentByTheUser = userGuessLinePontuations._doc.pontuationByFixture[userGuessLinePontuations._doc.pontuationByFixture.length - 1]
    searchQueryAndRequestObj.championshipRef = userGuessLinePontuations.championshipRef
    searchQueryAndRequestObj.fixture = request.fixture || lastRoundSentByTheUser.fixture
  }

  if (!searchQueryAndRequestObj.fixture) {
    return Promise.all([
      getPredictionsRepository.getUniqueChampionshipPredictions(searchQueryAndRequestObj),
      getLastRoundRepository(searchQueryAndRequestObj)
    ])
  }

  return Promise.all([
    getPredictionsRepository.getUniqueChampionshipPredictions(searchQueryAndRequestObj),
    getFixtureByChampionshipRefAndDateRepository(searchQueryAndRequestObj, language),
    userGuessLinePontuations
  ])
}

const _joinMatchResultWithPredictions = (repositoriesResponses) => {
  const predictions = repositoriesResponses[0]
  const fixture = repositoriesResponses[1]
  const pontuations = repositoriesResponses[2]
  fixture.guessLinePontuation = pontuations.totalPontuation ? pontuations.totalPontuation : 0
  fixture.fixturePontuation = predictions.fixturePontuation ? predictions.fixturePontuation : 0
  Reflect.deleteProperty(fixture, '_id')

  if (_theUserAlreadySentThePredictions(predictions)) {
    fixture.games.map((game) => {
      const gameGuess = predictions.guesses.find((guess) => game._id === guess.matchRef)
      game.gamePontuation = gameGuess.pontuation
      game.homeTeamScoreGuess = gameGuess.homeTeamScoreGuess
      game.awayTeamScoreGuess = gameGuess.awayTeamScoreGuess

      return game
    })
  }

  return fixture
}

const _buildSearchQueryAndRequestObj = (request) => {
  const searchQueryAndRequestObj = {
    userRef: request.userRef
  }
  if (request.championshipRef) {
    searchQueryAndRequestObj.championshipRef = request.championshipRef
  }

  if (request.fixture) {
    searchQueryAndRequestObj.fixture = request.fixture
  }

  return searchQueryAndRequestObj
}

const _theUserAlreadySentThePredictions = (predictions) => predictions !== null
const _theUserAlreadyHavePontuations = (userGuessLinePontuations) => userGuessLinePontuations !== null
/*eslint no-magic-numbers: 0*/

module.exports = getGuessLine