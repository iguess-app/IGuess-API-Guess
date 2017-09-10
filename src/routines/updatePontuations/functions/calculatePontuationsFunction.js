'use strict'

const _hitTheScoreboard = (game, guess) => game.homeTeamScore === guess.homeTeamScore && game.awayTeamScore === guess.awayTeamScore

module.exports = () => {

  const returnPontuation = (game, guess, pontuationRules) => {
    if (game.homeTeamScore && game.awayTeamScore) {
      if (game.homeTeamScore > game.awayTeamScore && guess.homeTeamScore > guess.awayTeamScore) {
        if (_hitTheScoreboard(game, guess)) {
          return pontuationRules.HIT_THE_SCOREBOARD
        }

        return pontuationRules.HIT_ONLY_THE_WINNER
      }
      if (game.homeTeamScore < game.awayTeamScore && guess.homeTeamScore < guess.awayTeamScore) {
        if (_hitTheScoreboard(game, guess)) {
          return pontuationRules.HIT_THE_SCOREBOARD
        }

        return pontuationRules.HIT_ONLY_THE_WINNER
      }
      if (game.homeTeamScore === game.awayTeamScore && guess.homeTeamScore === guess.awayTeamScore) {
        if (_hitTheScoreboard(game, guess)) {
          return pontuationRules.HIT_THE_SCOREBOARD
        }

        return pontuationRules.HIT_ONLY_THE_WINNER
      }
    }

    return pontuationRules.HIT_NOTHING
  }

  return {
    returnPontuation
  }
}

/*eslint max-statements: 0*/