'use strict'

const coincidents = require('iguess-api-coincidents')

const GuessLine = require('../../models/guessDB/guessesLinesModel')

const log = coincidents.Managers.logManager

const createGuessLine = (championship) => {
  const searchQuery = {
    'championship.championshipRef': championship._id
  }
  return GuessLine.findOne(searchQuery)
    .then((guessLineFound) => _insertNewGuessLine(guessLineFound, championship))
}

const _insertNewGuessLine = (guessLineFound, championship) => {
  if (!guessLineFound) {
    log.info(`${championship.championship} ${championship.season} inserting`)
    return GuessLine.create(_buildNewGuessLineObj(championship))
  }
  log.info(`${championship.championship} ${championship.season} already inserted`)
  return guessLineFound
}

const _buildNewGuessLineObj = (championship) => {
  const newGuessLineObj = {
    championship: {
      championshipRef: championship._id,
      league: championship.league,
      season: championship.season,
      championship: championship.championship
    },
    guessLineActive: championship.championshipActive,
    usersAddedAtGuessLine: []
  }

  return newGuessLineObj
}

module.exports = createGuessLine