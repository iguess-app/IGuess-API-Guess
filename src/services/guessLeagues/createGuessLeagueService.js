'use strict'

module.exports = (app) => {
  const createGuessLeagueRepository = app.src.repositories.guessLeagues.createGuessLeagueRepository
  const getChampionshipAtGuessLineRepository = app.src.repositories.guessLines.getChampionshipAtGuessLineRepository

  const createGuessLeague = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return getChampionshipAtGuessLineRepository.getChampionshipAtGuessLine(payload, dictionary)
      .then((championship) => createGuessLeagueRepository.createGuessLeague(payload, championship, dictionary))
  }

  return {
    createGuessLeague
  }
}