'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const MINIMUM_NUMBER_OF_ADM_ALLOW = 1

const quitCaptain = (request, dictionary) => {

  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRef]
    },
    captains: {
      $in: [request.userRef]
    }
  }

  const projectionQuery = {
    inviteads: 0
  }

  return GuessLeague.findOne(searchQuery, projectionQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)

      return _deleteCaptainFromCaptainsArray(guessLeagueFound, request).save()
      .then(() => ({
        removedFromCaptain: true
      }))
    })
}


const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw boom('notFound', dictionary.noGuessLeagueFound, errorCode.noGuessLeagueFound)
    
  }
  if (guessLeagueFound.captains.length <= MINIMUM_NUMBER_OF_ADM_ALLOW) {
    throw boom('notFound', dictionary.tooFewAdms, errorCode.tooFewAdms)
  }
}

const _deleteCaptainFromCaptainsArray = (guessLeagueFound, request) => {
  const QUANTITY_TO_REMOVE = 1
  const playerIndex = guessLeagueFound.captains.findIndex((captain) => captain === request.userRef)
  if (_checkIfIsAtArray(playerIndex)) {
    guessLeagueFound.captains.splice(playerIndex, QUANTITY_TO_REMOVE)
  }

  return guessLeagueFound
}

const NOT_AT_ARRAY = -1
const _checkIfIsAtArray = (index) => index !== NOT_AT_ARRAY

module.exports = quitCaptain