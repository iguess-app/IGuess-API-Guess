'use strict'

const CronJob = require('cron').CronJob

const cronTime = require('./cronTime')
const getUsersPredictionsFunctions = require('./functions/getUsersPredictionsFunctions')
const compareScoreWithPredictionAndSave = require('./functions/compareScoreWithPredictionAndSave')

const getAllChampionshipRepository = require('../../repositories/holi/getAllChampionshipRepository')
const getLastRoundRepository = require('../../repositories/holi/getLastRoundRepository')
const getFixtureByChampionshipRefAndDateRepository = require('../../repositories/holi/getFixtureByChampionshipRefAndDateRepository')

const cronJob = () => new CronJob(cronTime, () => {

  getAllChampionshipRepository({
    onlyActive: true
  }).then((championships) =>
    championships.forEach((championship) => {
      getLastRoundRepository({
          championshipRef: championship._id
        })
        .then((fixture) => getUsersPredictionsFunctions(fixture))
        .then((predictionsCursorAndFixtureObj) => compareScoreWithPredictionAndSave(predictionsCursorAndFixtureObj))
    })
  )
}, null, true, 'America/Sao_Paulo')

const updatePredictionsPontuationWithFixtureForced = (request) => getFixtureByChampionshipRefAndDateRepository(request)
  .then((fixture) => getUsersPredictionsFunctions(fixture))
  .then((predictionsCursorAndFixtureObj) => compareScoreWithPredictionAndSave(predictionsCursorAndFixtureObj))


module.exports = {
  updatePredictionsPontuationWithFixtureForced,
  cronJob
}