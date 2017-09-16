'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const Pontuations = app.src.models.pontuationsModel

  const getPontuations = (request, guessLine, dictionary) => {
    const searchQuery = _buildSearchQuery(request, guessLine)

    return Pontuations.findOne(searchQuery)
      .then((pontuationsFound) => {
        _checkErrors(pontuationsFound, dictionary)

        return pontuationsFound
      })
  }

  const _buildSearchQuery = (request, guessLine) => {
    const searchQuery = {
      'userRef': request.userRef,
      'championshipUserKey': `${guessLine.championship.championshipRef}_${request.userRef}`
    }

    if (request.championshipRef) {
      searchQuery.championshipUserKey = `${request.championshipRef}_${request.userRef}`
    }
    
    return searchQuery
  }

  const _checkErrors = (pontuationsFound, dictionary) => {
    if (!pontuationsFound) {
      throw Boom.notFound(dictionary.guessLineNotFound)
    }
  }

  return {
    getPontuations
  }
}