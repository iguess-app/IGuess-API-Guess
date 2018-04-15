'use strict'

const pontuationRules = require('iguess-api-coincidents').Config.pontuationRules

const _matchAlreadyStarted = (game) => Number.isInteger(game.homeTeamScore) && Number.isInteger(game.awayTeamScore)

const _homeTeamVictory = (game, guess) => game.homeTeamScore > game.awayTeamScore && guess.homeTeamScoreGuess > guess.awayTeamScoreGuess
const _awayTeamVictory = (game, guess) => game.homeTeamScore < game.awayTeamScore && guess.homeTeamScoreGuess < guess.awayTeamScoreGuess
const _drawMatch = (game, guess) => game.homeTeamScore === game.awayTeamScore && guess.homeTeamScoreGuess === guess.awayTeamScoreGuess

const _hitTheWinnerOrTheDraw = (game, guess) => _homeTeamVictory(game, guess) || _awayTeamVictory(game, guess) || _drawMatch(game, guess)

const returnPontuation = (game, guess) => {
  if (_matchAlreadyStarted(game)) {
    const homeTeamGoalsDiff = Math.abs(game.homeTeamScore - guess.homeTeamScoreGuess)
    const awayTeamGoalsDiff = Math.abs(game.awayTeamScore - guess.awayTeamScoreGuess)
    const matchGoalsDiff = homeTeamGoalsDiff + awayTeamGoalsDiff

    if (_hitTheWinnerOrTheDraw(game, guess)) {
      const pontuation = pontuationRules.MAX_PONTUATION_HITTING_THE_WINNER_OR_DRAW - matchGoalsDiff
      if (pontuation < pontuationRules.MIN_PONTUATION_HITTING_THE_WINNER_OR_DRAW) {
        return pontuationRules.MIN_PONTUATION_HITTING_THE_WINNER_OR_DRAW
      }
      return pontuation
    }
  }

  return pontuationRules.HIT_NOTHING
}

module.exports = returnPontuation