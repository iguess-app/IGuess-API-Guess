'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage
const sessionManager = require('../../managers/sessionManager')

const addUserToGuessLineRepository = require('../../repositories/guessLines/addUserToGuessLineRepository')

const addUserToGuessLine = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  return addUserToGuessLineRepository(payload, dictionary)
}

module.exports = addUserToGuessLine