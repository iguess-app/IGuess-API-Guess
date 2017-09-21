'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const GuessLine = app.src.models.guessesLinesModel
  const QueryUtils = app.coincidents.Utils.queryUtils

  const getChampionshipAtGuessLine = (request, dictionary) => {
    const searchQuery = _buildSearchQuery(request)
    const projectionQuery = {
      _id: 0,
      championship: 1
    }

    return GuessLine.findOne(searchQuery, projectionQuery)
      .then((championshipFromGuessLine) => {
        _checkErrors(championshipFromGuessLine, dictionary)

        return QueryUtils.makeObject(championshipFromGuessLine)
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

  return getChampionshipAtGuessLine
}