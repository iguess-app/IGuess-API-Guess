'use strict'

module.exports = (app) => {
  const quitAdministrationRepository = app.src.repositories.guessLeagues.quitAdministrationRepository

  const quitAdministration = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return quitAdministrationRepository(payload, dictionary)
  }

  return quitAdministration
}