'use strict'

const Boom = require('boom')

const Match = require('../../models/holiDB/matchModel')

const getMatchByRefRepository = (request, dictionary) => {
  const searchQuery = {
    matchRef: request.matchRef
  }

  return Match.findOne(searchQuery)
    .then((match) => {
      _treatErrors(match, dictionary, request.matchRef)
      return match.toJSON()
    })
}

const _treatErrors = (matchDay, dictionary, matchRef) => {
  if (!matchDay) {
    throw Boom.notFound(dictionary.matchNotFound, {matchRef})
  }
}

module.exports = getMatchByRefRepository