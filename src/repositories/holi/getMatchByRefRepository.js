'use strict'

const coincidents = require('iguess-api-coincidents')

const Match = require('../../models/holiDB/matchModel')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const getMatchByRefRepository = (request, dictionary) => {
  const searchQuery = {
    matchRef: request.matchRef
  }

  return Match.findOne(searchQuery)
    .then((match) => {
      _treatErrors(match, dictionary)
      return match.toJSON()
    })
}

const _treatErrors = (matchDay, dictionary) => {
  if (!matchDay) {
    throw boom('notFound', dictionary.matchNotFound, errorCode.matchNotFound)
  }
}

module.exports = getMatchByRefRepository