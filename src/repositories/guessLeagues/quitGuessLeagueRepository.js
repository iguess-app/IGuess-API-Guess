'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const QUANTITY_TO_REMOVE = 1
const NOT_AT_ARRAY = -1
const LAST_PLAYER_AT_GUESS_LEAGUE = 1

const quitGuessLeague = (request, dictionary) => {
  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRef]
    }
  }

  return GuessLeague.findOne(searchQuery)
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)

      return _deleteUserFromPlayersArray(guessLeagueFound, request)
        .then(() => ({
          removed: true
        }))
    })
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw boom('notFound', dictionary.noGuessLeagueFound, errorCode.noGuessLeagueFound)
  }
  if (guessLeagueFound.captains.includes(request.userRef) && guessLeagueFound.players.length > LAST_PLAYER_AT_GUESS_LEAGUE) {
    throw boom('notAcceptable', dictionary.admNotQuitGle, errorCode.admNotQuitGle)
  }
  if (!guessLeagueFound.players.includes(request.userRef)) {
    throw boom('notAcceptable', dictionary.notAtGuessLeague, errorCode.notAtGuessLeague)
  }
}

const _deleteUserFromPlayersArray = (guessLeagueFound, request) => {

  const playerIndex = guessLeagueFound.players.findIndex((player) => player === request.userRef)
  if (_checkIfIsAtArray(playerIndex)) {
    guessLeagueFound.players.splice(playerIndex, QUANTITY_TO_REMOVE)
  }
  
  if (guessLeagueFound.players.length) {
    return guessLeagueFound.save()
  }

  return guessLeagueFound.remove()
}

const _checkIfIsAtArray = (index) => index !== NOT_AT_ARRAY

module.exports = quitGuessLeague