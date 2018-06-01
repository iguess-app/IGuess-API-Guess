'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const MAX_GUESSLINES_FREE_ALLOW = coincidents.Config.guess.maxGuessLinesFreeAllow

const addUserToGuessLine = (request, dictionary) => {

  const searchQuery = {
    'championship.championshipRef': request.championshipRef,
    guessLineActive: true
  }

  return _countHowManyGuessLineActivatedTheUserHas(request)
    .then((userGuessLineActivatedNumber) => _verifyIfIsAllowToAddTheUserToAnotherGuessLine(userGuessLineActivatedNumber, request, dictionary))
    .then(() => _updateGuessline(request, searchQuery))
    .then((dbResponse) => _checkErrors(dbResponse, request, dictionary))
    .then(() => ({
      userAddedToGuessLine: true
    }))
}

const _countHowManyGuessLineActivatedTheUserHas = (request) => {
  const searchQuery = {
    usersAddedAtGuessLine: {
      $in: [request.userRef]
    },
    guessLineActive: true
  }

  return GuessLine.find(searchQuery).count()
}

const _verifyIfIsAllowToAddTheUserToAnotherGuessLine = (userGuessLineActivatedNumber, request, dictionary) => {
  if (userGuessLineActivatedNumber >= MAX_GUESSLINES_FREE_ALLOW && _userNotPremium(request)) {
    throw boom('forbidden', dictionary.noMoreGuessLineAllowed, errorCode.noMoreGuessLineAllowed)
  }
}

const _updateGuessline = (request, searchQuery) => { 
  const updateQuery = {
    '$addToSet': {
      usersAddedAtGuessLine: request.userRef
    }
  }

  const optionsQuery = {
    runValidators: true
  }

  return GuessLine.update(searchQuery, updateQuery, optionsQuery)
}

const _userNotPremium = () => {
  //TODO: Get dynamically if the user is premium or not
  const TEMP_RESPONSE_UNTIL_DOES_NOT_HAVE_THE_DATE = true
  return TEMP_RESPONSE_UNTIL_DOES_NOT_HAVE_THE_DATE
}

const _checkErrors = (dbResponse, request, dictionary) => {
  if (!dbResponse.n) {
    throw boom('notFound', dictionary.guessLineNotFound, errorCode.guessLineNotFound)
  }

  if (!dbResponse.nModified) {
    throw boom('unauthorized', dictionary.alreadyAdd, errorCode.alreadyAdd)
  }

}

module.exports = addUserToGuessLine