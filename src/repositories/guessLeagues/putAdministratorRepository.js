'use strict'

const Boom = require('boom')
const Mongoose = require('mongoose')
const objectId = Mongoose.Types.ObjectId

module.exports = (app) => {
  const GuessLeagues = app.src.models.guessesLeaguesModel

  const putAdministrator = (request, dictionary) => {

    const searchQuery = {
      _id: objectId(request.guessLeagueRef),
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

    return GuessLeagues.findOne(searchQuery, projectionQuery)
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

  return putAdministrator
}