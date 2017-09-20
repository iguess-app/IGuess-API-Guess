'use strict'

const Boom = require('boom')
const Mongoose = require('mongoose')
const objectId = Mongoose.Types.ObjectId

module.exports = (app) => {
  const GuessLeagues = app.src.models.guessesLeaguesModel

  const getGuessLeague = (request, dictionary) => {

    const searchQuery = {
      players: {
        $in: [request.userRef]
      }
    }

    if (request.guessLeagueRef) {
      searchQuery._id = objectId(request.guessLeagueRef)
    }

    const projectionQuery = {
      inviteads: 0
    }

    return GuessLeagues.findOne(searchQuery, projectionQuery)
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
    getGuessLeague
  }
}