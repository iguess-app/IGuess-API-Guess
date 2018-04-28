'use strict'

const coincidents = require('iguess-api-coincidents')
const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const putCaptain = (request, dictionary) => {

  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRef, request.userRefToCaptain]
    },
    captains: {
      $in: [request.userRef],
      $nin: [request.userRefToCaptain]
    }
  }

  const projectionQuery = {
    inviteads: 0
  }

  return GuessLeague.findOne(searchQuery, projectionQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)
      guessLeagueFound.captains.push(request.userRefToCaptain)

      return guessLeagueFound.save()
    })
    .then(() => ({
      newCaptainSetted: true
    }))
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw boom('notFound', dictionary.noGuessLeagueFound, errorCode.noGuessLeagueFound)
  }
}

module.exports = putCaptain