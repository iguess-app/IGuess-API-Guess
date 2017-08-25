'use Strict';

const Boom = require('boom')

module.exports = (app) => {
  const GuessLines = app.coincidents.Schemas.guessesLinesSchema
  const Predictions = app.coincidents.Schemas.predictionsSchema
  const Log = app.coincidents.Managers.logManager

  const setPredictions = (request, dictionary) => {
    const searchQuery = {
      'championship.championshipRef': request.championshipRef
    }

    return GuessLines.findOne(searchQuery)
      .then((guessLine) => {
        _checkIfExists(guessLine, dictionary)
        const championshipFixtureUserKey = `${request.championshipRef}_${request.fixture}_${request.userRef}`
        const requestFixtureIndex = guessLine.fixtures.findIndex((fixtureObj) => fixtureObj.fixture === request.fixture)

        if (guessLine.fixtures[requestFixtureIndex].usersWhoAlreadySentGuesses.includes(championshipFixtureUserKey)) {
          return _findAndUpdateUserPredictions(guessLine, request, championshipFixtureUserKey, requestFixtureIndex)
        }

        return _setNewUserPredictions(guessLine, request, championshipFixtureUserKey, requestFixtureIndex)
      })
      .catch((err) => Log.error(err))
  }

  const _findAndUpdateUserPredictions = (request, championshipFixtureUserKey) => {
    const searchQuery = {
      championshipFixtureUserKey
    }

    return Predictions.findOne(searchQuery)
      .then((oldPredictions) => {
        const oldPredictionsMatchRefsDictionary = _makeAMatchRefsDictionary(oldPredictions)
        
        return _filterAndUpdatePredictionsOneByOne(oldPredictionsMatchRefsDictionary, oldPredictions, request.guesses)
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
      guesses: request.guesses
    }
    guessLine.fixtures[requestFixtureIndex].usersWhoAlreadySentGuesses.push(championshipFixtureUserKey)

    return guessLine.save()
      .then(() => Predictions.create(newPredictions))
  }

  const _checkIfExists = (guessLine, dictionary) => {
    if (!guessLine) {
      throw Boom.notFound(dictionary.guessLineNotFound)
    }
  }

  return {
    setPredictions
  }
}


/*eslint max-params: [2, 4]*/