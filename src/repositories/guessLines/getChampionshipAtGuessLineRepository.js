'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const getChampionshipAtGuessLine = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)
  const projectionQuery = {
    _id: 0,
    championship: 1
  }

  return GuessLine.findOne(searchQuery, projectionQuery)
    .then((championshipFromGuessLine) => {
      _checkErrors(championshipFromGuessLine, dictionary)

      return queryUtils.makeObject(championshipFromGuessLine)
    })
}

const _buildSearchQuery = (request) => {
  const searchQuery = {
    'championship.championshipRef': request.championshipRef
  }

  return searchQuery
}

const _checkErrors = (championshipFromGuessLine, dictionary) => {
  if (!championshipFromGuessLine) {
    throw boom('notFound', dictionary.championshipNotFound, errorCode.championshipNotFound)
  }
}

module.exports = getChampionshipAtGuessLine