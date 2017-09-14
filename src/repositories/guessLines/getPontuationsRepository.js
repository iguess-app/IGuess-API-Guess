'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const Pontuations = app.src.models.pontuationsModel

  const getPontuations = (request, dictionary) => {
    const searchQuery = _buildSearchQuery(request)

    return Pontuations.find(searchQuery)
      .then((pontuationsFound) => {
        _checkErrors(pontuationsFound, dictionary)

        return pontuationsFound
      })
  }

  const _buildSearchQuery = (request) => {
    let searchQuery = {
      'userRef': request.userRef
    }
    if (request.championshipRef) {
      searchQuery = {
        'championshipUserKey': `${request.championshipRef}_${request.userRef}`
      }
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