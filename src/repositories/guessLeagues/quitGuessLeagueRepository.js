'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const LAST_PLAYER_AT_GUESS_LEAGUE = 1

const quitGuessLeague = async (request, dictionary) => {
  let someOtherCapSetted = false
  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $in: [request.userRef]
    }
  }

  const guessLeagueFound = await GuessLeague.findOne(searchQuery)
  
  _checkErrors(guessLeagueFound, request, dictionary)

  if (_userIsCaptain(guessLeagueFound, request) && _thereArePlayersAtLeague(guessLeagueFound)) {
    const newCaptainChosen = guessLeagueFound.players.find((playerRef) => request.userRef !== playerRef)
    someOtherCapSetted = await _setNetCaptain(searchQuery, newCaptainChosen) 
  }

  const removed = await _deleteUserFromPlayersArray(searchQuery, guessLeagueFound, request)

  return {
    removed,
    someOtherCapSetted
  }
}

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw boom('notFound', dictionary.noGuessLeagueFound, errorCode.noGuessLeagueFound)
  }
  if (!guessLeagueFound.players.includes(request.userRef)) {
    throw boom('notAcceptable', dictionary.notAtGuessLeague, errorCode.notAtGuessLeague)
  }
}

const _setNetCaptain = async (searchQuery, newCaptainChosen) => {
  const setNewCaptainUpdateQuery = {
    $push: {
      captains: newCaptainChosen
    }
  }
  const newCapResponseQuery = await GuessLeague.update(searchQuery, setNewCaptainUpdateQuery)

  return Boolean(newCapResponseQuery.nModified)
}

const _deleteUserFromPlayersArray = async (searchQuery, guessLeagueFound, request) => {
  const removeTheUserUpdateQuery = {
    $pull: {
      captains: request.userRef,
      players: request.userRef
    }
  }
  const removeNewUserResponseQuery = await GuessLeague.update(searchQuery, removeTheUserUpdateQuery)

  return Boolean(removeNewUserResponseQuery.nModified)
}

const _userIsCaptain = (guessLeague, request) => guessLeague.captains.includes(request.userRef)

const _thereArePlayersAtLeague = (guessLeagueFound) => guessLeagueFound.players.length > LAST_PLAYER_AT_GUESS_LEAGUE

module.exports = quitGuessLeague