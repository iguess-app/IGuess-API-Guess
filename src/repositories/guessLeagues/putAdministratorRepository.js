'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')
const GuessLeague = require('../../models/guessesLeaguesModel')

const queryUtils = coincidents.Utils.queryUtils

const putAdministrator = (request, dictionary) => {

  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRef, request.userRefToAdm]
    },
    administrators: {
      $in: [request.userRef],
      $nin: [request.userRefToAdm]
    }
  }

  const projectionQuery = {
    inviteads: 0
  }

  return GuessLeague.findOne(searchQuery, projectionQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)
      guessLeagueFound.administrators.push(request.userRefToAdm)

      return guessLeagueFound.save()
    })
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.notFound(dictionary.anyGuessLeagueFound)
  }
}

module.exports = putAdministrator