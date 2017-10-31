'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const { quitCaptainRepository } = require('../../repositories')

const quitCaptain = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return quitCaptainRepository(payload, dictionary)
}

module.exports = quitCaptain