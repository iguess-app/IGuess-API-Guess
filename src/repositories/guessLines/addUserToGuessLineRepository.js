'use strict'

const Boom = require('boom')

const GuessLine = require('../../models/guessesLinesModel')

const addUserToGuessLine = (request, dictionary) => {

  const searchQuery = {
    'championship.championshipRef': request.championshipRef
  }

  return GuessLine.findOne(searchQuery)
    .then((guessLineFound) => {
      _checkErrors(guessLineFound, request, dictionary)
      guessLineFound.usersAddedAtGuessLine.push(request.userRef)

      return guessLineFound.save()
        .then(() => ({
          userAddedToGuessLine: true
        }))
        .catch(() => ({
          userAddedToGuessLine: false
        }))
    })
}

const _checkErrors = (guessLineFound, request, dictionary) => {
  if (!guessLineFound) {
    throw Boom.notFound(dictionary.guessLineNotFound)
  }

  if (guessLineFound.usersAddedAtGuessLine.includes(request.userRef)) {
    throw Boom.unauthorized(dictionary.alreadyAdd)
  }

  if (!guessLineFound.guessLineActive) {
    throw Boom.unauthorized(dictionary.guessLineInactive)
  }
}

module.exports = addUserToGuessLine