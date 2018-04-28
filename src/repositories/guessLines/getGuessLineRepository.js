'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

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
    throw boom('notFound', dictionary.guessLineNotFound, errorCode.guessLineNotFound)
  }
}

module.exports = getGuessLineByUserRef