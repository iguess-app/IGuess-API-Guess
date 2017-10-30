'use strict'

const Boom = require('boom')
const queryUtils = require('iguess-api-coincidents').Utils.queryUtils

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const getGuessLeague = (request, dictionary) => {

  const searchQuery = {
    players: {
      $in: [request.userRef]
    }
  }

  if (request.guessLeagueRef) {
    searchQuery._id = queryUtils.makeObjectId(request.guessLeagueRef)
  }

  const projectionQuery = {
    inviteads: 0
  }

  return GuessLeague.findOne(searchQuery, projectionQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)

      return queryUtils.makeObject(guessLeagueFound)
    })
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.notFound(dictionary.anyGuessLeagueFound)
  }
}

module.exports = getGuessLeague