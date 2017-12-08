'use strict'

const Boom = require('Boom')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')
const coincidents = require('iguess-api-coincidents')

const queryUtils = coincidents.Utils.queryUtils

const editGuessLeague = (request, dictionary) => {
  const _id = queryUtils.makeObjectId(request.guessLeagueRef)
  return GuessLeague.findById(_id)
    .then((guessLeagueFound) => _checkErrors(guessLeagueFound, dictionary))
    .then((guessLeagueFound) => _modifyGuessLeagueAndSave(guessLeagueFound, request))
}

const _checkErrors = (guessLeagueFound, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.notFound(dictionary.guessLeagueNotFound)
  }
  return guessLeagueFound
}

const _modifyGuessLeagueAndSave = (guessLeagueObj, request) => {
  guessLeagueObj.guessLeagueName = request.newName
  return guessLeagueObj.save()
}

module.exports = editGuessLeague