'use strict'

const cronTime = require('./cronTime')

const CronJob = require('cron').CronJob

module.exports = (app) => {
  const GuessLines = app.coincidents.Schemas.guessesLinesSchema
  const requestManager = app.coincidents.Managers.requestManager
  const log = app.coincidents.Managers.logManager

  const cronJob = () => new CronJob(cronTime, _getAllchampionshipFromHoli, null, true, 'America/Sao_Paulo')

  const _getAllchampionshipFromHoli = () => {
    const url = `${app.coincidents.Config.apis.holiUrl}/championship/getAllchampionship`
    const headers = {
      'language': 'en-us',
      'content-type': 'application/json'
    }
    requestManager.get(url, headers)
      .then((championships) => _addGuessLines(championships))
  }

  const _addGuessLines = (championships) => {
    championships.map((championship) => {
      const searchQuery = {
        'championship.championshipRef': championship._id
      }

      return GuessLines.findOne(searchQuery)
        .then((guessLine) => {
          if (!guessLine) {
            return _insertNewGuessLine(championship)
          }

          return _updateFlagIsActive(championship, guessLine)
        })
        .catch((err) => log.error(err))
    })
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
      usersAddedAtGuessLine: [],
      fixtures: _buildFixtureObj(championship)
    }

    return GuessLines.create(newGuessLineObj)
  }

  const _buildFixtureObj = (championship) => championship.fixturesNames.map((fixtureName) => ({
    fixture: fixtureName
  }))

  const _updateFlagIsActive = (championship, guessLine) => {
    guessLine.guessLineActive = championship.championshipActive

    return guessLine.save()
  }

  cronJob()
}