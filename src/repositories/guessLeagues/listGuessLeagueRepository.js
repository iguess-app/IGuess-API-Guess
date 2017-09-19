'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const GuessLeagues = app.src.models.guessesLeaguesModel

  const listGuessLeagues = (request, dictionary) => {

    const searchQuery = {
      players: {
        $in: [request.userRef]
      }
    }

    const projectionQuery = {
      _id: 0,
      inviteads: 0
    }

    return GuessLeagues.find(searchQuery, projectionQuery)
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

  return {
    listGuessLeagues
  }
}