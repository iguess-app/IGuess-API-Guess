'use strict'

const CronJob = require('cron').CronJob
const log = require('iguess-api-coincidents').Managers.logManager

const cronTime = require('./cronTime')
const getUsersPredictionsFunctions = require('./functions/getUsersPredictionsFunctions')
const compareScoreWithPredictionAndSave = require('./functions/compareScoreWithPredictionAndSave')

const { getAllChampionshipRepository, getLastRoundRepository } = require('../../repositories')

const fireRoutine = () => {
  log.info('ROUTINE STARTED: update Pontuations')
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


module.exports = {
  cronJob
}