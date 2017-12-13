'use strict'

const Boom = require('boom')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const sessionManager = require('../../managers/sessionManager')
const putCaptainRepository = require('../../repositories/guessLeagues/putCaptainRepository')

const putCaptain = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  const session = await sessionManager.getSession(headers, dictionary)
  payload.userRef = session.userRef

  if (payload.userRef === payload.userRefToCaptain) {
    throw Boom.conflict(dictionary.youCantBeTheUserAndUserAdm)
  }

  return putCaptainRepository(payload, dictionary)
}

module.exports = putCaptain