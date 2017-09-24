'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const GuessLine = app.src.models.guessesLinesModel
  const StatusUtils = app.coincidents.Utils.statusUtils

  const verifyUserAtGuessLine = (request, dictionary) => {
    const searchQuery = _buildSearchQuery(request)

    return GuessLine.findOne(searchQuery)
      .then((guesslineFound) => {
        _checkErrors(guesslineFound, dictionary, request, StatusUtils)

        return {
          userRefAtGuessLineList: true
        }
      })
  }

  return verifyUserAtGuessLine
}

const _buildSearchQuery = (request) => {
  const searchQuery = {
    'championship.championshipRef': request.championshipRef,
    usersAddedAtGuessLine: {
      $in: [request.userRef]
    }
  }
  if (request.userRefInviteads.length) {
    searchQuery.usersAddedAtGuessLine.$all = request.userRefInviteads
  }

  return searchQuery
}

const _checkErrors = (guesslineFound, dictionary, request, StatusUtils) => {
  if (!guesslineFound) {
    throw Boom.create(StatusUtils.notFound, dictionary.notAtGuessLine, {
      request
    })
  }
}

/*eslint max-params: [2, 4]*/