'use strict'

const Boom = require('boom')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const putAdministratorRepository = require('../../repositories/guessLeagues/putAdministratorRepository')

const putAdministrator = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  if (payload.userRef === payload.userRefToAdm) {
    throw Boom.conflict(dictionary.youCantBeTheUserAndUserAdm)
  }

  return putAdministratorRepository(payload, dictionary)
}

module.exports = putAdministrator