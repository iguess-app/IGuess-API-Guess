'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const { quitCaptainRepository } = require('../../repositories')

const quitCaptain = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers.token, dictionary)
  payload.userRef = session.userRef

  return quitCaptainRepository(payload, dictionary)
}

module.exports = quitCaptain