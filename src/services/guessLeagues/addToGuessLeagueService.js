'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')
const { addToGuessLeagueRepository } = require('../../repositories/guessLeagues')
const verifyUserAtGuessLineRepository = require('../../repositories/guessLines/verifyUserAtGuessLineRepository')

const selectLanguage = coincidents.Translate.gate.selectLanguage
const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const addToGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  _checkIfThereAreDuplicatedUserRefToAdd(payload.userRefsToAdd, dictionary)
  await verifyUserAtGuessLineRepository(payload, dictionary)

  return addToGuessLeagueRepository(payload, dictionary)
}

const _checkIfThereAreDuplicatedUserRefToAdd = (userRefsToAdd, dictionary) => {
  const thereAreDuplicated = userRefsToAdd.some((userRefToAdd, currentIndex) => userRefsToAdd.indexOf(userRefToAdd) !== currentIndex)
  if (thereAreDuplicated) {
    throw boom('notAcceptable', dictionary.userRefDuplicated, errorCode.userRefDuplicated)
  }
}

module.exports = addToGuessLeague