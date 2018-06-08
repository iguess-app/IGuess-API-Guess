'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

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
      const guessLeagueCleanObj = queryUtils.makeObject(guessLeagueFound)  
      guessLeagueCleanObj.isCaptain = guessLeagueCleanObj.captains.includes(request.userRef)
    
      return guessLeagueCleanObj
    })
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw boom('notFound', dictionary.noGuessLeagueFound, errorCode.noGuessLeagueFound)    
  }
}

module.exports = getGuessLeague