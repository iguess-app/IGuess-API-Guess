'use strict'

module.exports = (app) => {
  const inviteResponseRepository = app.src.repositories.guessLeagues.inviteResponseRepository
  const verifyUserAtGuessLineRepository = app.src.repositories.guessLines.verifyUserAtGuessLineRepository

  const inviteResponse = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return verifyUserAtGuessLineRepository(payload, dictionary)
      .then(() => inviteResponseRepository(payload, dictionary))
      .catch((err) => err)
  }


  return inviteResponse
}