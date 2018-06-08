'use strict'

const coincidents = require('iguess-api-coincidents')
const Promise = require('bluebird')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const MAX_GUESSLEAGUES_FREE_ALLOW = coincidents.Config.guess.maxGuessLeagueFreeAllow

const addToGuessLeague = async (request, dictionary) => {
  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    captains: {
      $in: [request.userRef]
    }
  }
  const guessLeagueFound = await GuessLeague.findOne(searchQuery)
  
  _checkErrors(guessLeagueFound, request, dictionary)

  const usersFiltered = await _checkAllUsersGuessLeagueLimit(request)
  const usersAddedSuccessfully = await _addNewUsersToTheLeague(searchQuery, request, usersFiltered)

  return {
    someUsersNotAdded: usersFiltered.length !== request.userRefsToAdd.length,
    usersAddedSuccessfully
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

const _checkAllUsersGuessLeagueLimit = async (request) => {
  const guessLeagueQuantityPromiseArray = request.userRefsToAdd.map((userRefToAdd) => {
    const searchQuery = {
      players: {
        $in: [userRefToAdd]
      }
    }
    return Promise.props({
      guessLeagueQuantity: GuessLeague.find(searchQuery).count(),
      userRefToAdd
    })
  })

  const usersWithLeaguesQuantity = await Promise.map(guessLeagueQuantityPromiseArray, (obj) => obj)

  const usersFiltered = usersWithLeaguesQuantity
    .filter((userWithLeaguesQuantity) => userWithLeaguesQuantity.guessLeagueQuantity < MAX_GUESSLEAGUES_FREE_ALLOW)
    .map((userFiltered) => userFiltered.userRefToAdd)

  return usersFiltered
}

const _addNewUsersToTheLeague = async (searchQuery, request, usersFiltered) => {
  const addUsersUpdateQuery = {
    $addToSet: {
      players: {
        $each: usersFiltered
      }
    }
  }
  const addUsersResponseQuery = await GuessLeague.update(searchQuery, addUsersUpdateQuery)

  return Boolean(addUsersResponseQuery.nModified)
}

module.exports = addToGuessLeague