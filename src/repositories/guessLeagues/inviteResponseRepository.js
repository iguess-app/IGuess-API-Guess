'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')
const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const statusUtils = coincidents.Utils.statusUtils
const queryUtils = coincidents.Utils.queryUtils

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
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.create(statusUtils.forbidden, dictionary.someWrongAtInvite, request)
  }
}

const _deleteUserFromInviteadsArray = (guessLeagueFound, request) => {
  const QUANTITY_TO_REMOVE = 1
  const playerIndex = guessLeagueFound.inviteads.findIndex((invited) => invited === request.userRef)
  guessLeagueFound.inviteads.splice(playerIndex, QUANTITY_TO_REMOVE)

  return guessLeagueFound
}

module.exports = inviteToGuessLeagueRepository