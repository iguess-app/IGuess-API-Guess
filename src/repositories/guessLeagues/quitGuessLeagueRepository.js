'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const queryUtils = coincidents.Utils.queryUtils

const quitGuessLeague = (request, dictionary) => {
  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRef]
    }
  }

  return GuessLeague.findOne(searchQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)

      return _deleteUserFromPlayersArray(guessLeagueFound, request).save()
        .then(() => ({
          removed: true
        }))
    })
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.notFound(dictionary.anyGuessLeagueFound)
  }
  if (guessLeagueFound.captains.includes(request.userRef)) {
    throw Boom.notAcceptable(dictionary.admNotQuitGle)
  }
  if (!guessLeagueFound.players.includes(request.userRef)) {
    throw Boom.notAcceptable(dictionary.notAtGuessLeague)
  }
}

const _deleteUserFromPlayersArray = (guessLeagueFound, request) => {
  const QUANTITY_TO_REMOVE = 1
  const playerIndex = guessLeagueFound.players.findIndex((player) => player === request.userRef)
  guessLeagueFound.players.splice(playerIndex, QUANTITY_TO_REMOVE)

  return guessLeagueFound
}

module.exports = quitGuessLeague