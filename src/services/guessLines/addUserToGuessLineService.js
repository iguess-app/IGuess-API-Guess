'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const addUserToGuessLineRepository = require('../../repositories/guessLines/addUserToGuessLineRepository')

const addUserToGuessLine = (request, headers) => {
  const dictionary = selectLanguage(headers.language)

  return addUserToGuessLineRepository(request, dictionary)
}

module.exports = addUserToGuessLine