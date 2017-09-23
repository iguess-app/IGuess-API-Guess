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
      .then((quessLeagueFound) => {
        _checkErrors(quessLeagueFound, request, dictionary, StatusUtils)
        quessLeagueFound.players.push(request.userRef)
        _deleteUserFromInviteadsArray(quessLeagueFound, request.userRef)

        return quessLeagueFound.save()
      })
  }

  return inviteToGuessLeagueRepository
}

const _checkErrors = (quessLeagueFound, request, dictionary, StatusUtils) => {
  if (!quessLeagueFound) {
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