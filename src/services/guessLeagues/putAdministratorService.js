'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const putAdministratorRepository = app.src.repositories.guessLeagues.putAdministratorRepository

  const putAdministrator = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    
    if (payload.userRef === payload.userRefToAdm) {
      throw Boom.conflict(dictionary.youCantBeTheUserAndUserAdm)
    }

    return putAdministratorRepository.putAdministrator(payload, dictionary)
  }

  return {
    putAdministrator
  }
}