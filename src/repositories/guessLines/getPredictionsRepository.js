'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const Predictions = app.src.models.predictionsModel
  const QueryUtils = app.coincidents.Utils.queryUtils

  const getPredictions = (request, dictionary) => {
    const searchQuery = _buildSearchQuery(request)

    return Predictions.find(searchQuery)
      .then((predictionsFound) => {
        _checkErrors(predictionsFound, dictionary)

        return predictionsFound
      })
  }

  const getUniqueChampionshipPredictions = (request, dictionary) => {
    const searchQuery = _buildSearchQuery(request)

    return Predictions.findOne(searchQuery)
      .then((predictionFound) => {
        _checkErrors(predictionFound, dictionary)

        return QueryUtils.makeObject(predictionFound)
      })
  }

  const getAllUserFromAFixtureUsingCursor = (fixture) => {
    const searchQuery = {
      'championshipFixtureUserKey': {
        '$regex': `${fixture.championshipRef}_${fixture.fixture}`
      }
    }

    return Predictions.find(searchQuery).cursor()
  }

  const _buildSearchQuery = (request) => {
    let searchQuery = {
      'userRef': request.userRef
    }
    if (request.championshipRef) {
      searchQuery = {
        'championshipFixtureUserKey': `${request.championshipRef}_${request.fixture}_${request.userRef}`
      }
    }

    return searchQuery
  }

  const _checkErrors = (predictionsFound, dictionary) => {
    if (!predictionsFound) {
      throw Boom.notFound(dictionary.guessLineNotFound)
    }
  }

  return {
    getPredictions,
    getUniqueChampionshipPredictions,
    getAllUserFromAFixtureUsingCursor
  }
}