'use strict'

const cronTime = require('./cronTime')

const CronJob = require('cron').CronJob

const _buildFixtureObj = (championship) => championship.fixturesNames.map((fixtureName) => ({
  fixture: fixtureName
}))

const _updateFlagIsActive = (championship, guessLine) => {
  guessLine.guessLineActive = championship.championshipActive

  return guessLine.save()
}

const _insertNewGuessLine = (championship, GuessLines) => {
  const newGuessLineObj = {
    championship: {
      championshipRef: championship._id,
      league: championship.league,
      season: championship.season,
      championship: championship.championship
    },
    guessLineActive: championship.championshipActive,
    usersAddedAtGuessLine: [],
    fixtures: _buildFixtureObj(championship)
  }

  return GuessLines.create(newGuessLineObj)
}

const _addGuessLines = (championships, GuessLines, log) => {
  championships.map((championship) => {
    const searchQuery = {
      'championship.championshipRef': championship._id
    }

    return GuessLines.findOne(searchQuery)
      .then((guessLine) => {
        if (!guessLine) {
          return _insertNewGuessLine(championship, GuessLines)
        }

        return _updateFlagIsActive(championship, guessLine)
      })
      .catch((err) => log.error(err))
  })
}

module.exports = (app) => {
  const GuessLines = app.src.models.guessesLinesModel
  const requestManager = app.coincidents.Managers.requestManager
  const log = app.coincidents.Managers.logManager

  const cronJob = () => new CronJob(cronTime, getAllchampionshipFromHoli, null, true, 'America/Sao_Paulo')

  const getAllchampionshipFromHoli = () => {
    const url = `${app.coincidents.Config.apis.holiUrl}/championship/getAllchampionship`
    const headers = {
      'language': 'en-us',
      'content-type': 'application/json'
    }
    requestManager.get(url, headers)
      .then((championships) => _addGuessLines(championships, GuessLines, log))
  }

  cronJob()

  return getAllchampionshipFromHoli
}