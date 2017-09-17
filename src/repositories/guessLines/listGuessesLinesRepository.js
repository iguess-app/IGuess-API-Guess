'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const GuessLines = app.src.models.guessesLinesModel

  const listGuessesLines = (request, dictionary) => {

    const searchQuery = {
      usersAddedAtGuessLine: {
        $in: [request.userRef]
      }
    }
    if (request.onlyActive === true) {
      searchQuery.guessLineActive
    }

    const projectionQuery = {
      _id: 0,
      championship: 1,
      guessLineActive: 1
    }

    return GuessLines.find(searchQuery, projectionQuery)
      .then((guessLineFound) => {
        _checkErrors(guessLineFound, request, dictionary)
        
        return guessLineFound
      })
  }

  const _checkErrors = (guessLineFound, request, dictionary) => {
    if (!guessLineFound) {
      throw Boom.notFound(dictionary.anyGuessLineFound)
    }
  }

  return {
    listGuessesLines
  }
}