'use strict'

const Boom = require('boom')

const GuessLine = require('../../models/guessesLinesModel')

const getGuessLineByUserRef = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)

  return GuessLine.findOne(searchQuery)
    .then((guessLineFound) => {
      _checkErrors(guessLineFound, dictionary)

      return guessLineFound
    })
}

const _buildSearchQuery = (request) => {
  const searchQuery = {
    'usersAddedAtGuessLine': {
      '$in': [request.userRef]
    },
    'guessLineActive': true
  }
  if (request.championshipRef) {
    searchQuery['championship.championshipRef'] = request.championshipRef

  }

  return searchQuery
}

const _checkErrors = (guessLineFound, dictionary) => {
  if (!guessLineFound) {
    throw Boom.notFound(dictionary.guessLineNotFound)
  }
}

module.exports = getGuessLineByUserRef