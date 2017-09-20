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
      inviteads: 0,
      players: 0,
      administrators: 0
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