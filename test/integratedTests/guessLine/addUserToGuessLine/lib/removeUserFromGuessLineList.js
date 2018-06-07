'use strict'

const GuessLine = require('../../../../../src/models/guessDB/guessesLinesModel')
const happyPathRequest = require('../injectedRequests').happyPathRequest

const removeUserFromGuessLineList = () => {
  const updateQuery = {
    'championship.championshipRef': happyPathRequest.payload.championshipRef,
    '$pull': {
      'usersAddedAtGuessLine': happyPathRequest.headers.token
    }
  }
  return GuessLine.update(updateQuery)
}

module.exports = removeUserFromGuessLineList