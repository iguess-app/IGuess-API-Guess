'use strict'

module.exports = (app) => {
  const listGuessLeagueRepository = app.src.repositories.guessLeagues.listGuessLeagueRepository

  const listGuessLeagues = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return listGuessLeagueRepository.listGuessLeagues(payload, dictionary)
  }

  return {
    listGuessLeagues
  }
}