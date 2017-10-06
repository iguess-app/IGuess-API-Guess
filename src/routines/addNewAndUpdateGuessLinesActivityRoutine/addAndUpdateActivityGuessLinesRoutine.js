'use strict'

const CronJob = require('cron').CronJob
const coincidents = require('iguess-api-coincidents')

const cronTime = require('./cronTime')
const GuessLine = require('../../models/guessDB/guessesLinesModel')

const requestManager = coincidents.Managers.requestManager
const log = coincidents.Managers.logManager

const _updateFlagIsActive = (championship, guessLine) => {
  guessLine.guessLineActive = championship.championshipActive

  return guessLine.save()
}

const _insertNewGuessLine = (championship) => {
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

  return GuessLine.create(newGuessLineObj)
}

const _addGuessLines = (championships) => {
  championships.map((championship) => {
    const searchQuery = {
      'championship.championshipRef': championship._id
    }

    return GuessLine.findOne(searchQuery)
      .then((guessLine) => {
        if (!guessLine) {
          return _insertNewGuessLine(championship)
        }

        return _updateFlagIsActive(championship, guessLine)
      })
      .catch((err) => {
        log.error(err)
        throw err
      })
  })
}

const cronJob = () => new CronJob(cronTime, getAllchampionshipFromHoli, null, true, 'America/Sao_Paulo')

const getAllchampionshipFromHoli = () => {
  const url = `${coincidents.Config.apis.holiUrl}/championship/getAllchampionship`
  const headers = {
    'language': 'en-us',
    'content-type': 'application/json'
  }
  requestManager.get(url, headers)
    .then((championships) => _addGuessLines(championships))
}

module.exports = {
  getAllchampionshipFromHoli,
  cronJob
}

/*
TODO: Put all the logic that use Database in some repository to respect the partner 
*/