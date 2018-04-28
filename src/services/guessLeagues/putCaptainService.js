'use strict'

const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')
const putCaptainRepository = require('../../repositories/guessLeagues/putCaptainRepository')

const selectLanguage = coincidents.Translate.gate.selectLanguage
const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const putCaptain = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  if (payload.userRef === payload.userRefToCaptain) {
    throw boom('conflict', dictionary.youCantBeTheUserAndUserAdm, errorCode.youCantBeTheUserAndUserAdm)
  }

  return putCaptainRepository(payload, dictionary)
}

module.exports = putCaptain