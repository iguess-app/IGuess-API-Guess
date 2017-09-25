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
        _checkErrors(quessLeagueFound, request, dictionary, StatusUtils)
        request.userRefInviteads.map((userRefInvited) => quessLeagueFound.inviteads.push(userRefInvited))

        return quessLeagueFound.save()
      })
  }

  return inviteToGuessLeagueRepository
}

const _checkErrors = (quessLeagueFound, request, dictionary, StatusUtils) => {
  if (!quessLeagueFound) {
    throw Boom.create(StatusUtils.forbidden, dictionary.someWrongAtInvite, request)
  }
  //TODO tornar esse erro mais intuitivo para o front
}

/*eslint max-params: [2, 4]*/