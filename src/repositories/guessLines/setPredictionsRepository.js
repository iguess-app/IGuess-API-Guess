'use Strict';

const Boom = require('boom')

module.exports = (app) => {
  const GuessLines = app.coincidents.Schemas.guessesLinesSchema;

  const setPredictions = (request, dictionary) => {

    const searchQuery = {
      championshipRef: request.championshipId
    }

    return GuessLines.findOne(searchQuery)
      .then((guessLine) => {
        _checkIfExists(guessLine, dictionary)
        const reqFixtureIndex = _getFixtureArrayIndex(guessLine, request)
        const requestFixture = _returnFixtureObject(guessLine, request, reqFixtureIndex)
        const usersPredictions = _deleteIfTheUserAlreadySentPredictions(requestFixture.users, request)
        usersPredictions.push(_buildUserPredictionObject(guessLine, request))

        if (guessLine.fixtures[reqFixtureIndex]) {
          guessLine.fixtures[reqFixtureIndex].users = usersPredictions

          return guessLine.save()
        }
        guessLine.fixtures.push(requestFixture)

        return guessLine.save()
      })
      .catch((err) => err)
  }

  const _checkIfExists = (guessLine, dictionary) => {
    if (!guessLine) {
      throw Boom.notFound(dictionary.guessLineNotFound)
    }
  }

  const _returnFixtureObject = (guessLine, request, reqFixtureIndex) => {
    if (!guessLine.fixtures[reqFixtureIndex]) {
      const reqFixture = {};
      reqFixture.fixtureNumber = request.fixtureNumber
      reqFixture.users = []

      return reqFixture
    }

    return guessLine.fixtures[reqFixtureIndex]
  }

  const _getFixtureArrayIndex = (guessLine, request) =>
    guessLine.fixtures.findIndex((fixture) => fixture.fixtureNumber === request.fixtureNumber)

  const _deleteIfTheUserAlreadySentPredictions = (usersPredictions, request) => {
    usersPredictions.forEach((userPredictions, index) => {
      if (userPredictions.userId === request.userId) {
        const DELETE_COUNT = 1
        usersPredictions.splice(index, DELETE_COUNT)
      }
    })

    return usersPredictions
  }

  const _buildUserPredictionObject = (guessLine, request) => {

    /*Should check if the teams exists on championship?
    TODO ? Maybe I should use REDIS to get the teams Info quickly
    TODO Be sure the the userId is the same in the user Session*/
    const userPrediction = {}
    userPrediction.userId = request.userId
    userPrediction.guesses = request.guesses

    return userPrediction
  }

  return {
    setPredictions
  }
}