'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')
const { kickUserFromGuessLeagueRepository } = require('../../repositories')

const selectLanguage = coincidents.Translate.gate.selectLanguage
const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const kickUserFromGuessLeague = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef
  _checkErrors(payload, dictionary)

  return kickUserFromGuessLeagueRepository(payload, dictionary)
}

const _checkErrors = (payload, dictionary) => {
  if (payload.userRef === payload.userRefToKick) {
    throw boom('badRequest', dictionary.kickMySelf, errorCode.kickMySelf)
  }
}

module.exports = kickUserFromGuessLeague