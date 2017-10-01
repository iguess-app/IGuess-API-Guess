'use strict'

const Boom = require('boom')
const queryUtils = require('iguess-api-coincidents').Utils.queryUtils

const GuessLeague = require('../../models/guessesLeaguesModel')

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
    .then((guessesLeaguesFound) => {
      _checkErrors(guessesLeaguesFound, request, dictionary)

      return guessesLeaguesFound
    })
}

const _checkErrors = (guessesLeaguesFound, request, dictionary) => {
  if (!guessesLeaguesFound) {
    throw Boom.notFound(dictionary.anyGuessLeagueFound)
  }
}

module.exports = getGuessLeague