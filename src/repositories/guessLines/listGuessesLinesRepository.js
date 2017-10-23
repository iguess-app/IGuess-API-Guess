'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const queryUtils = coincidents.Utils.queryUtils

const GuessLine = require('../../models/guessDB/guessesLinesModel')

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

  return GuessLine.find(searchQuery, projectionQuery)
    .then((guessesLineFound) => guessesLineFound.map((guessLineFound) => queryUtils.makeObject(guessLineFound)))
}

module.exports = listGuessesLines