'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const verifyUserAtGuessLineRepository = require('../../repositories/guessLines/verifyUserAtGuessLineRepository')

const userAtGuessLine = (request, headers) => {
  const dictionary = selectLanguage(headers.language)

  return verifyUserAtGuessLineRepository(request, dictionary)
}

module.exports = userAtGuessLine