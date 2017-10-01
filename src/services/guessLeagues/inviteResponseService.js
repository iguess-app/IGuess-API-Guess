'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const inviteResponseRepository = require('../../repositories/guessLeagues/inviteResponseRepository')
const verifyUserAtGuessLineRepository = require('../../repositories/guessLines/verifyUserAtGuessLineRepository')

const inviteResponse = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return verifyUserAtGuessLineRepository(payload, dictionary)
    .then(() => inviteResponseRepository(payload, dictionary))
}

module.exports = inviteResponse