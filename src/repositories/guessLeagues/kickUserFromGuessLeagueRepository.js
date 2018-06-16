'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { queryUtils } = coincidents.Utils


const kickUserFromGuessLeague = async (request) => {

  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRefToKick]
    },
    captains: {
      $in: [request.userRef]
    }
  }

  const updateQuery = {
    '$pull': {
      'players': request.userRefToKick
    }
  }

  const queryResult = await GuessLeague.update(searchQuery, updateQuery)

  return {
    removed: Boolean(queryResult.nModified)
  }
}

module.exports = kickUserFromGuessLeague