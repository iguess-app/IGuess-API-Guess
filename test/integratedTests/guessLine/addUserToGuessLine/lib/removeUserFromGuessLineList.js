'use strict'

const GuessLine = require('../../../../../src/models/guessDB/guessesLinesModel')
const happyPathRequest = require('../injectedRequests').happyPathRequest

const QUANTITY_TO_REMOVE = 1

const removeUserFromGuessLineList = () => {
  const searchQuery = {
    'championship.championshipRef': happyPathRequest.payload.championshipRef,
    'usersAddedAtGuessLine': {
      '$in': [happyPathRequest.headers.token]
    }
  }
  return GuessLine.findOne(searchQuery)
  .then((guessLineFound) => {
    if (!guessLineFound) {
      return Promise.resolve()
    }
    guessLineFound.usersAddedAtGuessLine.splice(
      guessLineFound.usersAddedAtGuessLine.indexOf(happyPathRequest.payload.userRef), QUANTITY_TO_REMOVE
    )
    return guessLineFound.save()
  })
}

module.exports = removeUserFromGuessLineList