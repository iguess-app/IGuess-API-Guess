'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')
const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const queryUtils = coincidents.Utils.queryUtils
const statusUtils = coincidents.Utils.statusUtils

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
        inviteads: guessLeagueFiltered.inviteads
      }
    })
}


const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.create(statusUtils.forbidden, dictionary.someWrongAtInvite, request)
  }
  //TODO: tornar esse erro mais intuitivo para o front
}

module.exports = inviteToGuessLeagueRepository