'use strict'

const coincidents = require('iguess-api-coincidents')

const queryUtils = coincidents.Utils.queryUtils

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const listGuessesLines = (request) => {

  const searchQuery = _buildSearchQuery(request)

  const projectionQuery = {
    _id: 0,
    championship: 1,
    guessLineActive: 1
  }

  const sortQuery = {
    'championship.championshipRef': 1
  }

  return GuessLine.find(searchQuery, projectionQuery)
    .sort(sortQuery)
    .then((guessesLineFound) => 
      guessesLineFound.map((guessLineFound) => queryUtils.makeObject(guessLineFound))
    )
}

const _buildSearchQuery = (request) => {
  const searchQuery = {}
  
  if (request.listAll) {
    searchQuery.guessLineActive = true
    return searchQuery
  }

  searchQuery.usersAddedAtGuessLine = {
    $in: [request.userRef]
  }
  if (request.onlyActive === true) {
    searchQuery.guessLineActive = request.onlyActive
  }
  return searchQuery
}

module.exports = listGuessesLines