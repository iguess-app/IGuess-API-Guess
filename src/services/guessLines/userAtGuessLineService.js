'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const verifyUserAtGuessLineRepository = require('../../repositories/guessLines/verifyUserAtGuessLineRepository')

const userAtGuessLine = async (request, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers.token, dictionary)

  return verifyUserAtGuessLineRepository(request, dictionary)
}

module.exports = userAtGuessLine