'use strict'

const homeTeamWinHitScoreboard = {
  guess: {
    homeTeamScoreGuess: 2,
    awayTeamScoreGuess: 0
  },
  game: {
    homeTeamScore: 2,
    awayTeamScore: 0
  }
}

const awayTeamWinHitScoreboard = {
  guess: {
    homeTeamScoreGuess: 1,
    awayTeamScoreGuess: 3
  },
  game: {
    homeTeamScore: 1,
    awayTeamScore: 3
  }
}

const homeTeamWinHitWinner = {
  guess: {
    homeTeamScoreGuess: 1,
    awayTeamScoreGuess: 0
  },
  game: {
    homeTeamScore: 2,
    awayTeamScore: 1
  }
}

const awayTeamWinHitWinner = {
  guess: {
    homeTeamScoreGuess: 2,
    awayTeamScoreGuess: 3
  },
  game: {
    homeTeamScore: 0,
    awayTeamScore: 1
  }
}

const tieWinHitWinner = {
  guess: {
    homeTeamScoreGuess: 3,
    awayTeamScoreGuess: 3
  },
  game: {
    homeTeamScore: 1,
    awayTeamScore: 1
  }
}

const tieWinHitScoreboard = {
  guess: {
    homeTeamScoreGuess: 1,
    awayTeamScoreGuess: 1
  },
  game: {
    homeTeamScore: 1,
    awayTeamScore: 1
  }
}

const gameObjWithOutResult = {
  guess: {
    homeTeamScoreGuess: 1,
    awayTeamScoreGuess: 1
  },
  game: {
  }
}

const hitNothingAwayWin = {
  guess: {
    homeTeamScoreGuess: 2,
    awayTeamScoreGuess: 1
  },
  game: {
    homeTeamScore: 1,
    awayTeamScore: 3
  }
}

const hitNothingHomeWin = {
  guess: {
    homeTeamScoreGuess: 2,
    awayTeamScoreGuess: 1
  },
  game: {
    homeTeamScore: 1,
    awayTeamScore: 3
  }
}

module.exports = {
  homeTeamWinHitScoreboard,
  awayTeamWinHitScoreboard,
  tieWinHitScoreboard,
  homeTeamWinHitWinner,
  awayTeamWinHitWinner,
  tieWinHitWinner,
  gameObjWithOutResult,
  hitNothingAwayWin,
  hitNothingHomeWin
}