'use strict'

const Boom = require('boom')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const putCaptainRepository = require('../../repositories/guessLeagues/putCaptainRepository')

const putCaptain = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  if (payload.userRef === payload.userRefToAdm) {
    throw Boom.conflict(dictionary.youCantBeTheUserAndUserAdm)
  }

  return putCaptainRepository(payload, dictionary)
}

module.exports = putCaptain