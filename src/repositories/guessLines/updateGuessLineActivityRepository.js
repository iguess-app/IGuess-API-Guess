'use strict'

const updateFlagIsActive = (guessLine, championship) => {
  guessLine.guessLineActive = championship.championshipActive

  return guessLine.save()
}

module.exports = updateFlagIsActive