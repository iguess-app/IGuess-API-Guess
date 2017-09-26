'use strict'

const Boom = require('boom')
const Mongoose = require('mongoose')
const objectId = Mongoose.Types.ObjectId

module.exports = (app) => {
  const GuessLeague = app.src.models.guessesLeaguesModel
  const StatusUtils = app.coincidents.Utils.statusUtils

  const inviteToGuessLeagueRepository = (request, dictionary) => {

    const searchQuery = {
      _id: objectId(request.guessLeagueRef),
      players: {
        $nin: [request.userRef]
      },
      inviteads: {
        $in: [request.userRef]
      }
    }

    return GuessLeague.findOne(searchQuery)
      .then((guessLeagueFound) => {
        _checkErrors(guessLeagueFound, request, dictionary, StatusUtils)
        _deleteUserFromInviteadsArray(guessLeagueFound, request.userRef)
        if (request.response) {
          guessLeagueFound.players.push(request.userRef)
        }

        return guessLeagueFound.save()
      })
  }

  return inviteToGuessLeagueRepository
}

const _checkErrors = (guessLeagueFound, request, dictionary, StatusUtils) => {
  if (!guessLeagueFound) {
    throw Boom.create(StatusUtils.forbidden, dictionary.someWrongAtInvite, request)
  }
}

const _deleteUserFromInviteadsArray = (guessLeagueFound, request) => {
  const QUANTITY_TO_REMOVE = 1
  const playerIndex = guessLeagueFound.inviteads.findIndex((invited) => invited === request.userRef)
  guessLeagueFound.inviteads.splice(playerIndex, QUANTITY_TO_REMOVE)

  return guessLeagueFound
}

/*eslint max-params: [2, 4]*/