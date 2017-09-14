'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const GuessLines = app.src.models.guessesLinesModel
  const Predictions = app.src.models.predictionsModel

  const setPredictions = (request, dictionary) => {
    const searchQuery = {
      'championship.championshipRef': request.championshipRef
    }

    return GuessLines.findOne(searchQuery)
      .then((guessLine) => {
        _checkErrors(guessLine, request, dictionary)
        const championshipFixtureUserKey = `${request.championshipRef}_${request.fixture}_${request.userRef}`
        const requestFixtureIndex = guessLine.fixtures.findIndex((fixtureObj) => fixtureObj.fixture === request.fixture)

        if (guessLine.fixtures[requestFixtureIndex].usersWhoAlreadySentGuesses.includes(championshipFixtureUserKey)) {
          return _findAndUpdateUserPredictions(request, championshipFixtureUserKey)
        }

        return _setNewUserPredictions(guessLine, request, championshipFixtureUserKey, requestFixtureIndex)
      })
  }

  const _findAndUpdateUserPredictions = (request, championshipFixtureUserKey) => {
    const searchQuery = {
      championshipFixtureUserKey
    }

    return Predictions.findOne(searchQuery)
      .then((oldPredictions) => {
        const oldPredictionsMatchRefsDictionary = _makeAMatchRefsDictionary(oldPredictions)
        
        return _filterAndUpdatePredictionsOneByOne(oldPredictionsMatchRefsDictionary, oldPredictions, request.guesses)
        .then(() => _returnSuccessMsg())
      })
  }

  const _makeAMatchRefsDictionary = (oldPredictions) => {
    const oldPredictionsMatchRefsDictionary = {}
    oldPredictions.guesses.forEach((oldSinglePrediction, index) => {
      oldPredictionsMatchRefsDictionary[oldSinglePrediction.matchRef] = index
    })

    return oldPredictionsMatchRefsDictionary
  }

  const _filterAndUpdatePredictionsOneByOne = (oldPredictionsMatchRefsDictionary, oldPredictions, newPredictions) => {
    newPredictions.forEach((newSinglePrediction) => {
      if (Number.isInteger(oldPredictionsMatchRefsDictionary[newSinglePrediction.matchRef])) {
        const index = oldPredictionsMatchRefsDictionary[newSinglePrediction.matchRef]
        oldPredictions.guesses[index] = newSinglePrediction

        return
      }
      oldPredictions.guesses.push(newSinglePrediction)
    })
    
    return oldPredictions.save()
  }

  const _setNewUserPredictions = (guessLine, request, championshipFixtureUserKey, requestFixtureIndex) => {
    const newPredictions = {
      championshipFixtureUserKey,
      userRef: request.userRef,
      guesses: request.guesses
    }
    guessLine.fixtures[requestFixtureIndex].usersWhoAlreadySentGuesses.push(championshipFixtureUserKey)

    return guessLine.save()
      .then(() => Predictions.create(newPredictions))
      .then(() => _returnSuccessMsg())
  }

  const _checkErrors = (guessLine, request, dictionary) => {
    if (!guessLine) {
      throw Boom.notFound(dictionary.guessLineNotFound)
    }
    if (!guessLine.usersAddedAtGuessLine.includes(request.userRef)) {
      throw Boom.notAcceptable(dictionary.userNotAddedAtGuessLine)
    }
  }

  const _returnSuccessMsg = () => ({
    predictionsSetted: true
  })

  return {
    setPredictions
  }
}


/*eslint max-params: [2, 4]*/