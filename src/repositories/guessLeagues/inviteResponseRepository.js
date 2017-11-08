'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')
const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const statusUtils = coincidents.Utils.statusUtils
const queryUtils = coincidents.Utils.queryUtils

const QUANTITY_TO_REMOVE = 1
const NOT_AT_ARRAY = -1

const inviteToGuessLeagueRepository = (request, dictionary) => {

  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $nin: [request.userRef]
    },
    inviteads: {
      $in: [request.userRef]
    }
  }

  return GuessLeague.findOne(searchQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)
      _deleteUserFromInviteadsArray(guessLeagueFound, request.userRef)
      if (request.response) {
        guessLeagueFound.players.push(request.userRef)
      }

      return guessLeagueFound.save()
    })
    .then((guessLeagueUpdated) => ({
      invitationResponded: true,
      userAddedToGuessLeague: Boolean(guessLeagueUpdated.players.find((playerRef) => playerRef === request.userRef))
    }))
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.create(statusUtils.forbidden, dictionary.someWrongAtInvite, request)
  }
}

const _deleteUserFromInviteadsArray = (guessLeagueFound, userRef) => {
  const playerIndex = guessLeagueFound.inviteads.findIndex((invited) => invited === userRef)
  if (_checkIfIsAtArray(playerIndex)) {
    guessLeagueFound.inviteads.splice(playerIndex, QUANTITY_TO_REMOVE)
  }
  return guessLeagueFound
}

const _checkIfIsAtArray = (index) => index !== NOT_AT_ARRAY

module.exports = inviteToGuessLeagueRepository