'use strict'

const Prediction = require('../../models/guessDB/predictionsModel')

const getPredictions = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)

  return Prediction.findOne(searchQuery)
}

const getPredictionByMatchRef = (request) => {
  const searchQuery = {
    'matchRef': request.matchRef ? request.matchRef : request._id.toString()
  }

  return Prediction.find(searchQuery).cursor()
}

const getPredictionByUnixDate = (request) => {
  const searchQuery = {
    'matchInitTime': request.unixDate
  }

  return Prediction.find(searchQuery).cursor()
}

const getPontuationByUnixDate = (request) => {
  const searchQuery = {
    userRef: request.userRef,
    matchInitTime: request.unixDate
  }

  return Prediction.find(searchQuery)
    .then((predictions) => _sumAllPontuations(predictions))
}

const getTotalPontuation = (request) => {
  const searchQuery = {
    userRef: request.userRef
  }

  return Prediction.find(searchQuery)
    .then((predictions) => _sumAllPontuations(predictions))
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

const ZERO_PONTUATION = 0
const _sumAllPontuations = (predictions) =>
  predictions.reduce((acumulator, prediction) => {
    return acumulator + prediction.matchPontuation ? prediction.matchPontuation : ZERO_PONTUATION
  }, ZERO_PONTUATION)


module.exports = {
  getPredictions,
  getPredictionByMatchRef,
  getPredictionByUnixDate,
  getPontuationByUnixDate,
  getTotalPontuation
}