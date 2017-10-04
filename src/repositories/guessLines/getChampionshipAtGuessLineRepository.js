'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const queryUtils = coincidents.Utils.queryUtils

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
    throw Boom.notFound(dictionary.championshipNotFound)
  }
}

module.exports = getChampionshipAtGuessLine