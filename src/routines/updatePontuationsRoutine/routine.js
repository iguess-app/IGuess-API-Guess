'use strict'

const CronJob = require('cron').CronJob
const log = require('iguess-api-coincidents').Managers.logManager

const cronTime = require('./cronTime')
const getUsersPredictionsFunctions = require('./functions/getUsersPredictionsFunctions')
const compareScoreWithPredictionAndSave = require('./functions/compareScoreWithPredictionAndSave')

const { getAllChampionshipRepository, getLastRoundRepository, getFixtureByChampionshipRefAndDateRepository } = require('../../repositories')

const fireRoutine = () => {
  const filter = {
    onlyActive: true
  }
  getAllChampionshipRepository(filter)
    .then((championships) =>
      championships.map((championship) => {
        const championshipFilter = {
          championshipRef: championship._id.toString()
        }
        return getLastRoundRepository(championshipFilter)
          .then((matchDay) => getUsersPredictionsFunctions(matchDay))
          .then((predictionsCursorAndMatchDayObj) => compareScoreWithPredictionAndSave(predictionsCursorAndMatchDayObj))
      })
    ).catch((err) => log.error(err))
}

const cronJob = () => new CronJob(cronTime, fireRoutine, null, true, 'America/Sao_Paulo')

const updatePredictionsPontuationWithFixtureForced = (request) => getFixtureByChampionshipRefAndDateRepository(request)
  .then((fixture) => getUsersPredictionsFunctions(fixture))
  .then((predictionsCursorAndFixtureObj) => compareScoreWithPredictionAndSave(predictionsCursorAndFixtureObj))


module.exports = {
  updatePredictionsPontuationWithFixtureForced,
  cronJob
}