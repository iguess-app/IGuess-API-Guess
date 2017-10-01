'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')
const GuessLeague = require('../../models/guessesLeaguesModel')

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
    administrators: {
      $in: [request.userRef]
    }
  }

  return GuessLeague.findOne(searchQuery)
    .then((quessLeagueFound) => {
      _checkErrors(quessLeagueFound, request, dictionary)
      request.userRefInviteads.map((userRefInvited) => quessLeagueFound.inviteads.push(userRefInvited))

      return quessLeagueFound.save()
    })
}


const _checkErrors = (quessLeagueFound, request, dictionary) => {
  if (!quessLeagueFound) {
    throw Boom.create(statusUtils.forbidden, dictionary.someWrongAtInvite, request)
  }
  //TODO tornar esse erro mais intuitivo para o front
}

module.exports = inviteToGuessLeagueRepository