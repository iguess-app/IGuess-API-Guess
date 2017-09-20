'use strict'

const Boom = require('boom')
const Mongoose = require('mongoose')

const objectId = Mongoose.Types.ObjectId

module.exports = (app) => {
  const GuessLeague = app.src.models.guessesLeaguesModel

  const quitGuessLeague = (request, dictionary) => {
    const searchQuery = {
      _id: objectId(request.guessLeagueRef),
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

  return {
    quitGuessLeague
  }
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.notFound(dictionary.anyGuessLeagueFound)
  }
  if (guessLeagueFound.administrators.includes(request.userRef)) {
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