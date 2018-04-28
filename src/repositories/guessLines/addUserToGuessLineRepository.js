'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const MAX_GUESSLINES_FREE_ALLOW = coincidents.Config.guess.maxGuessLinesFreeAllow

const addUserToGuessLine = (request, dictionary) => {

  const searchQuery = {
    'championship.championshipRef': request.championshipRef
  }

  return _countHowManyGuessLineActivatedTheUserHas(request)
    .then((userGuessLineActivatedNumber) => _verifyIfIsAllowToAddTheUserToAnotherGuessLine(userGuessLineActivatedNumber, request, dictionary))
    .then(() => GuessLine.findOne(searchQuery))
    .then((guessLineFound) => {
      _checkErrors(guessLineFound, request, dictionary)
      guessLineFound.usersAddedAtGuessLine.push(request.userRef)

      return guessLineFound.save()
        .then(() => ({
          userAddedToGuessLine: true
        }))
        .catch(() => ({
          userAddedToGuessLine: false
        }))
    })
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

const _userNotPremium = () => {
  //TODO: Get dynamically if the user is premium or not
  const TEMP_RESPONSE_UNTIL_DOES_NOT_HAVE_THE_DATE = true
  return TEMP_RESPONSE_UNTIL_DOES_NOT_HAVE_THE_DATE
}

const _checkErrors = (guessLineFound, request, dictionary) => {
  if (!guessLineFound) {
    throw boom('notFound', dictionary.guessLineNotFound, errorCode.guessLineNotFound)
  }

  if (guessLineFound.usersAddedAtGuessLine.includes(request.userRef)) {
    throw boom('unauthorized', dictionary.alreadyAdd, errorCode.alreadyAdd)
  }

  if (!guessLineFound.guessLineActive) {
    throw boom('unauthorized', dictionary.guessLineInactive, errorCode.guessLineInactive)
  }
}

module.exports = addUserToGuessLine