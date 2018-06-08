'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const MAX_GUESSLEAGUES_FREE_ALLOW = coincidents.Config.guess.maxGuessLeagueFreeAllow

const listGuessLeagues = (request, dictionary) => {

  const searchQuery = {
    players: {
      $in: [request.userRef]
    }
  }

  const projectionQuery = {
    inviteads: 0,
    players: 0,
    captains: 0
  }

  return GuessLeague.find(searchQuery, projectionQuery)
    .then((guessesLeaguesFound) => {
      _checkErrors(guessesLeaguesFound, request, dictionary)
      
      const guessLeaguesList = guessesLeaguesFound.map((guessLineFound) => queryUtils.makeObject(guessLineFound))

      return {
        allowToAddMoreLeague: guessesLeaguesFound.length < MAX_GUESSLEAGUES_FREE_ALLOW,
        guessLeaguesList
      }
    })
}

const _checkErrors = (guessesLeaguesFound, request, dictionary) => {
  if (!guessesLeaguesFound.length) {
    throw boom('notFound', dictionary.noGuessLeagueFound, errorCode.noGuessLeagueFound)
  }
}

module.exports = listGuessLeagues