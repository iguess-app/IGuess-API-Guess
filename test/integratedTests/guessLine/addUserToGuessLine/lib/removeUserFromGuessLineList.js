'use strict'

const GuessLine = require('../../../../../src/models/guessDB/guessesLinesModel')
const happyPathRequest = require('../injectedRequests').happyPathRequest

const removeUserFromGuessLineList = () => {
  const searchQuery = {
    'championship.championshipRef': happyPathRequest.payload.championshipRef,
    'usersAddedAtGuessLine': {
      '$in': [happyPathRequest.payload.userRef]
    }
  }
  return GuessLine.findOne(searchQuery)
  .then((guessLineFound) => {
    if (!guessLineFound) {
      return Promise.resolve()
    }
    guessLineFound.usersAddedAtGuessLine.splice(
      guessLineFound.usersAddedAtGuessLine.indexOf(happyPathRequest.payload.userRef)
    )
    
    return guessLineFound.save()
  })
}

module.exports = removeUserFromGuessLineList