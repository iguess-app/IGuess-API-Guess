'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const queryUtils = coincidents.Utils.queryUtils

const listGuessLeagues = (request, dictionary) => {

  const searchQuery = {
    players: {
      $in: [request.userRef]
    }
  }

  const projectionQuery = {
    inviteads: 0,
    players: 0,
    administrators: 0
  }

  return GuessLeague.find(searchQuery, projectionQuery)
    .then((guessesLeaguesFound) => {
      _checkErrors(guessesLeaguesFound, request, dictionary)
      
      return guessesLeaguesFound.map((guessLineFound) => queryUtils.makeObject(guessLineFound))
    })
}

const _checkErrors = (guessesLeaguesFound, request, dictionary) => {
  if (!guessesLeaguesFound.length) {
    throw Boom.notFound(dictionary.anyGuessLeagueFound)
  }
}

module.exports = listGuessLeagues