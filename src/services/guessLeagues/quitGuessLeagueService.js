'use strict'

module.exports = (app) => {
  const quitGuessLeagueRepository = app.src.repositories.guessLeagues.quitGuessLeagueRepository

  const quitGuessLeague = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    
    return quitGuessLeagueRepository.quitGuessLeague(payload, dictionary)
  }

  return {
    quitGuessLeague
  }
}