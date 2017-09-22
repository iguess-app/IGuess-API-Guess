'use strict'

module.exports = (app) => {
  const inviteToGuessLeagueRepository = app.src.repositories.guessLeagues.inviteToGuessLeagueRepository
  const verifyUserAtGuessLineRepository = app.src.repositories.guessLines.verifyUserAtGuessLineRepository

  const inviteToGuessLeague = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return verifyUserAtGuessLineRepository(payload, dictionary)
      .then(() => inviteToGuessLeagueRepository(payload, dictionary))
      .catch((err) => err)
  }


  return inviteToGuessLeague
}