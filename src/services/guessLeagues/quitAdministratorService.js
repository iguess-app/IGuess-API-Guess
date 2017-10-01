'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const quitAdministrationRepository = require('../../repositories/guessLeagues/quitAdministrationRepository')

const quitAdministration = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return quitAdministrationRepository(payload, dictionary)
}

module.exports = quitAdministration