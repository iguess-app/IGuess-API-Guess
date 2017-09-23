'use strict';

module.exports = (app) => {
  const getPontuationsRepository = app.src.repositories.guessLines.getPontuationsRepository
  const getPredictionsRepository = app.src.repositories.guessLines.getPredictionsRepository
  const getGuessLineRepository = app.src.repositories.guessLines.getGuessLineRepository
  const getFixtureByChampionshipRefAndFixtureRepository = app.src.repositories.holi.getFixtureByChampionshipRefAndFixtureRepository
  const getLastRoundRepository = app.src.repositories.holi.getLastRoundRepository

  const getGuessLine = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getGuessLineRepository.getGuessLineByUserRef(request, dictionary)
      .then((guessLine) => getPontuationsRepository.getPontuations(request, guessLine, dictionary))
      .then((userGuessLinesPontuations) => _getLastRoundSentByTheUser(userGuessLinesPontuations, request, headers.language))
      .then((repositoriesResponses) => _joinMatchResultWithPredictions(repositoriesResponses))
      .catch((err) => err)
  }

  const _getLastRoundSentByTheUser = (userGuessLinePontuations, request, language) => {
    const searchQueryAndRequestObj = _buildSearchQueryAndRequestObj(request)

    if (_theUserAlreadyHavePontuations(userGuessLinePontuations)) {
      const lastRoundSentByTheUser = userGuessLinePontuations.pontuationByFixture[userGuessLinePontuations.pontuationByFixture.length - 1]
      searchQueryAndRequestObj.championshipRef = userGuessLinePontuations.championshipRef
      searchQueryAndRequestObj.fixture = request.fixture || lastRoundSentByTheUser.fixture
    }

    if (!searchQueryAndRequestObj.fixture) {
      return Promise.all([
        getPredictionsRepository.getUniqueChampionshipPredictions(searchQueryAndRequestObj),
        getLastRoundRepository.getLastRound(searchQueryAndRequestObj)
      ])
    }

    return Promise.all([
      getPredictionsRepository.getUniqueChampionshipPredictions(searchQueryAndRequestObj),
      getFixtureByChampionshipRefAndFixtureRepository.getFixtureByChampionshipRefAndFixture(searchQueryAndRequestObj, language),
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

  return {
    getGuessLine
  }
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

/*
  TODO Dar um jeito da request pro Holi não ser primordial.. para manter a resiliencia entre MicroServices
*/