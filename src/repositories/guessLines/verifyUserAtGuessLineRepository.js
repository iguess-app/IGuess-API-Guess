'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const verifyUserAtGuessLine = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)

  return GuessLine.findOne(searchQuery)
    .then((guesslineFound) => {
      _checkErrors(guesslineFound, dictionary, request)

      return {
        userRefAtGuessLineList: Boolean(guesslineFound)
      }
    })
}

const _buildSearchQuery = (request) => {
  const searchQuery = {
    'championship.championshipRef': request.championshipRef,
    usersAddedAtGuessLine: {
      $in: [request.userRef]
    }
  }
  if (request.userRefInviteads && request.userRefInviteads.length) {
    searchQuery.usersAddedAtGuessLine.$all = request.userRefInviteads
  }
  if (request.userRefsToAdd && request.userRefsToAdd.length) {
    searchQuery.usersAddedAtGuessLine.$all = request.userRefsToAdd
  }

  return searchQuery
}

const _checkErrors = (guesslineFound, dictionary, request) => {
  if (!guesslineFound && !request.notBoomIfNotFound) {
    throw boom('notFound', dictionary.notAtGuessLine, errorCode.notAtGuessLine)
  }
}

module.exports = verifyUserAtGuessLine