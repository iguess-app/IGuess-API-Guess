'use strict'

const coincidents = require('iguess-api-coincidents')
const Boom = require('boom')

const Round = require('../../models/holiDB/roundModel')

const queryUtils = coincidents.Utils.queryUtils

const getMatchByRefRepository = (request, dictionary) => {
  const searchQuery = {
    'games._id': queryUtils.makeObjectId(request.matchRef)
  }

  return Round.findOne(searchQuery)
    .then((matchDay) => {
      _treatErrors(matchDay, dictionary)
      return matchDay
    })
    .then((matchDay) => {
      let match = matchDay.games.find((game) => game.id === request.matchRef)
      _treatErrors(match, dictionary)
      match = match.toJSON()
      match.initTimeUnixDate = matchDay.unixDate
      return match
    })
}

const _treatErrors = (matchDay, dictionary) => {
  if (!matchDay) {
    throw Boom.notFound(dictionary.matchNotFound)
  }
}

module.exports = getMatchByRefRepository