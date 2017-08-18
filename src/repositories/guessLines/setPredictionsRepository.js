/* eslint-disable */
'use Strict';

const Boom = require('boom')

module.exports = (app) => {
  const GuessLines = app.coincidents.Schemas.guessesLinesSchema

  const setPredictions = (request, dictionary) => {

    const searchQuery = {
      'championship.championshipRef': request.championshipRef
    }
    
    return GuessLines.findOne(searchQuery)
    .then((guessLine) => {
      _checkIfExists(guessLine, dictionary)
        const userChampionshipFixtureKey = `${request.championshipRef}_${request.fixture}_${request.userRef}`
        const requestFixture = guessLine.fixtures[request.fixture]
        /* 
          TODO HERE
          Se não existir a userChampionshipFixtureKey na guessLine.fixtures[request.fixture]: 
            settar userChampionshipFixtureKey no guessLine.fixtures[request.fixture],
            e inserir o array prediction do usuário no collection de prediction (Usar a userChampionshipFixtureKey como chave)
          Se existir a userChampionshipFixtureKey na guessLine.fixtures[request.fixture]: 
            usar a userChampionshipFixtureKey para buscar os predictions já setados na collection, filter por matchId e atualizar novas predictions
        */

      })
      .catch((err) => 
        err
    )
  }

  const _checkIfExists = (guessLine, dictionary) => {
    if (!guessLine) {
      throw Boom.notFound(dictionary.guessLineNotFound)
    }
  }

  const _returnFixtureObject = (guessLine, request, reqFixtureIndex) => {
    if (!guessLine.fixtures[reqFixtureIndex]) {
      const reqFixture = {};
      reqFixture.fixture = request.fixture
      reqFixture.users = []

      return reqFixture
    }

    return guessLine.fixtures[reqFixtureIndex]
  }

  const _getFixtureArrayIndex = (guessLine, request) =>
    guessLine.fixtures.findIndex((fixture) => fixture.fixture === request.fixture)

  const _userPredictionsAlreadySetted = (usersPredictions, request) => {
    const userPredictionsFound = usersPredictions.find((userPredictions) => userPredictions.userRef === request.userRef)

    return userPredictionsFound
  }

  const _overwriteDuplicatedMatches = (oldPredictions, newPredictions) => {
    oldPredictions.map((oldPrediction) => {

    })
  }

  const _buildUserPredictionObject = (guessLine, request) => {

    /*Should check if the teams exists on championship?
    TODO ? Maybe I should use REDIS to get the teams Info quickly
    TODO Be sure the the userRef is the same in the user Session*/
    const userPrediction = {}
    userPrediction.userRef = request.userRef
    userPrediction.guesses = request.guesses

    return userPrediction
  }

  return {
    setPredictions
  }
}