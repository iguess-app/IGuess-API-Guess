'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessesLeaguesModel')

const queryUtils = coincidents.Utils.queryUtils

const MINIMUM_NUMBER_OF_ADM_ALLOW = 1

const quitAdministration = (request, dictionary) => {

  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRef]
    },
    administrators: {
      $in: [request.userRef]
    }
  }

  const projectionQuery = {
    inviteads: 0
  }

  return GuessLeague.findOne(searchQuery, projectionQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)

      return _deleteAdministratorFromAdministratorsArray(guessLeagueFound, request).save()
    })
}


const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.notFound(dictionary.anyGuessLeagueFound)
  }
  if (guessLeagueFound.administrators.length <= MINIMUM_NUMBER_OF_ADM_ALLOW) {
    throw Boom.notFound(dictionary.tooFewAdms)
  }
}

const _deleteAdministratorFromAdministratorsArray = (guessLeagueFound, request) => {
  const QUANTITY_TO_REMOVE = 1
  const playerIndex = guessLeagueFound.administrators.findIndex((administrator) => administrator === request.userRef)
  guessLeagueFound.administrators.splice(playerIndex, QUANTITY_TO_REMOVE)

  return guessLeagueFound
}

module.exports = quitAdministration