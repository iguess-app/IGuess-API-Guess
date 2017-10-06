'use strict'

const Boom = require('boom')
const statusUtils = require('iguess-api-coincidents').Utils.statusUtils

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const verifyUserAtGuessLine = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)

  return GuessLine.findOne(searchQuery)
    .then((guesslineFound) => {
      _checkErrors(guesslineFound, dictionary, request)

      return {
        userRefAtGuessLineList: true
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

  return searchQuery
}

const _checkErrors = (guesslineFound, dictionary, request) => {
  if (!guesslineFound) {
    throw Boom.create(statusUtils.notFound, dictionary.notAtGuessLine, {
      request
    })
  }
}

module.exports = verifyUserAtGuessLine