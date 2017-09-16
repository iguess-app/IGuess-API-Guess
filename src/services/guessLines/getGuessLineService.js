'use strict';

module.exports = (app) => {
  const getPontuationsRepository = app.src.repositories.guessLines.getPontuationsRepository
  const getPredictionsRepository = app.src.repositories.guessLines.getPredictionsRepository
  const getGuessLineRepository = app.src.repositories.guessLines.getGuessLineRepository
  const getFixtureByChampionshipRefAndFixtureRepository = app.src.repositories.holi.getFixtureByChampionshipRefAndFixtureRepository

  const getGuessLine = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getGuessLineRepository.getGuessLineByUserRef(request, dictionary)
      .then((guessLine) => getPontuationsRepository.getPontuations(request, guessLine, dictionary))
      .then((userGuessLinesPontuations) => _getLastRoundSentByTheUser(userGuessLinesPontuations))
      .then((repositoriesResponses) => _joinMatchResultWithPredictions(repositoriesResponses))

  }

  const _getLastRoundSentByTheUser = (userGuessLinePontuations) => {
    const lastRoundSentByTheUser = userGuessLinePontuations.pontuationByFixture[userGuessLinePontuations.pontuationByFixture.length - 1]
    const request = {
      userRef: userGuessLinePontuations.userRef,
      championshipRef: userGuessLinePontuations.championshipRef,
      fixture: lastRoundSentByTheUser.fixture
    }

    return Promise.all([
      getPredictionsRepository.getUniqueChampionshipPredictions(request),
      getFixtureByChampionshipRefAndFixtureRepository.getFixtureByChampionshipRefAndFixture(request)
    ])
  }

  const _joinMatchResultWithPredictions = (repositoriesResponses) => {
    const predictions = repositoriesResponses[0]
    const fixture = repositoriesResponses[1]

    fixture.games.map((game) => {
      const gameGuess = predictions.guesses.find((guess) => game._id === guess.matchRef)
      game.pontuation = gameGuess.pontuation

      return game
    })

    return fixture
  }

  return {
    getGuessLine
  }
}

/*eslint no-magic-numbers: 0*/

/*
  Pegar primeiro um guessLine activo (qualquer) do usuario, 
  daí pegar a pontuation dele com isso a ultima rodada inserida,
  dai pegar a fixture no Holi e as predictions no banco daqui,
  dai juntar todas match via matchID e devolver = )

  TODO Dar um jeito da request pro Holi não ser primordial.. para manter a resiliencia entre MicroServices
*/