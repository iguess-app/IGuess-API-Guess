'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const editGuessLeague = (request, dictionary) => {
  const _id = queryUtils.makeObjectId(request.guessLeagueRef)
  const searchQuery = {
    _id,
    players: request.userRef
  }
  return GuessLeague.findOne(searchQuery)
    .then((guessLeagueFound) => _checkErrors(guessLeagueFound, dictionary))
    .then((guessLeagueFound) => _modifyGuessLeagueAndSave(guessLeagueFound, request))
}

const _checkErrors = (guessLeagueFound, dictionary) => {
  if (!guessLeagueFound) {
    throw boom('notFound', dictionary.guessLeagueNotFound, errorCode.guessLeagueNotFound)    
  }
  return guessLeagueFound
}

const _modifyGuessLeagueAndSave = (guessLeagueObj, request) => {
  guessLeagueObj.guessLeagueName = request.newName
  return guessLeagueObj.save()
}

module.exports = editGuessLeague