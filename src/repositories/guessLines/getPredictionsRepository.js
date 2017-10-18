'use strict'

const Prediction = require('../../models/guessDB/predictionsModel')

const getPredictions = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)

  return Prediction.findOne(searchQuery)
}

const getUniqueChampionshipPredictions = (request) => {
  const searchQuery = _buildSearchQuery(request)

  return Prediction.findOne(searchQuery)
}

const getAllUserFromAFixtureUsingCursor = (fixture) => {
  const searchQuery = {
    'championshipFixtureUserKey': {
      '$regex': `${fixture.championshipRef}_${fixture.fixture}`
    }
  }

  return Prediction.find(searchQuery).cursor()
}

const _buildSearchQuery = (request) => {
  let searchQuery = {
    'userRef': request.userRef
  }
  if (request.matchRef) {
    searchQuery = {
      'matchUserRef': `${request.matchRef}_${request.userRef}`
    }
  }

  return searchQuery
}

module.exports = {
  getPredictions,
  getUniqueChampionshipPredictions,
  getAllUserFromAFixtureUsingCursor
}