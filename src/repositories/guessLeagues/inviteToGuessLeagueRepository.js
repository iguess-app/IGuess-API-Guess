'use strict'

const coincidents = require('iguess-api-coincidents')
const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const inviteToGuessLeagueRepository = (request, dictionary) => {

  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRef],
      $nin: request.userRefInviteads
    },
    inviteads: {
      $nin: request.userRefInviteads
    },
    captains: {
      $in: [request.userRef]
    }
  }

  return GuessLeague.findOne(searchQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)
      request.userRefInviteads.map((userRefInvited) => guessLeagueFound.inviteads.push(userRefInvited))

      return guessLeagueFound.save()
    })
    .then((guessLeagueUpdated) => {
      const guessLeagueFiltered = guessLeagueUpdated.toJSON()
      return {
        guessLeagueRef: guessLeagueFiltered._id.toString(),
        championship: guessLeagueFiltered.championship,
        inviteads: request.userRefInviteads
      }
    })
}


const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw boom('forbidden', dictionary.someWrongAtInvite, errorCode.someWrongAtInvite)
  }
  //TODO: tornar esse erro mais intuitivo para o front
}

module.exports = inviteToGuessLeagueRepository