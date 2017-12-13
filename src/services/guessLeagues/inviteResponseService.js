'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const inviteResponseRepository = require('../../repositories/guessLeagues/inviteResponseRepository')
const verifyUserAtGuessLineRepository = require('../../repositories/guessLines/verifyUserAtGuessLineRepository')

const inviteResponse = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  return verifyUserAtGuessLineRepository(payload, dictionary)
    .then(() => inviteResponseRepository(payload, dictionary))
}

module.exports = inviteResponse