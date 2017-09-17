'use strict'

const _hitTheScoreboard = (game, guess) => game.homeTeamScore === guess.homeTeamScoreGuess && game.awayTeamScore === guess.awayTeamScoreGuess

const returnPontuation = (game, guess, pontuationRules) => {
  if (game.hasOwnProperty('homeTeamScore') && game.hasOwnProperty('awayTeamScore')) {
    if (game.homeTeamScore > game.awayTeamScore && guess.homeTeamScoreGuess > guess.awayTeamScoreGuess) {
      if (_hitTheScoreboard(game, guess)) {
        return pontuationRules.HIT_THE_SCOREBOARD
      }

      return pontuationRules.HIT_ONLY_THE_WINNER
    }
    if (game.homeTeamScore < game.awayTeamScore && guess.homeTeamScoreGuess < guess.awayTeamScoreGuess) {
      if (_hitTheScoreboard(game, guess)) {
        return pontuationRules.HIT_THE_SCOREBOARD
      }

      return pontuationRules.HIT_ONLY_THE_WINNER
    }
    if (game.homeTeamScore === game.awayTeamScore && guess.homeTeamScoreGuess === guess.awayTeamScoreGuess) {
      if (_hitTheScoreboard(game, guess)) {
        return pontuationRules.HIT_THE_SCOREBOARD
      }

      return pontuationRules.HIT_ONLY_THE_WINNER
    }
  }

  return pontuationRules.HIT_NOTHING
}

module.exports = returnPontuation


/*eslint max-statements: 0*/