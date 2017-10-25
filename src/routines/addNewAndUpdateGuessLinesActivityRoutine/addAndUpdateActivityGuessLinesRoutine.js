'use strict'

const CronJob = require('cron').CronJob
const coincidents = require('iguess-api-coincidents')

const cronTime = require('./cronTime')
const getAllchampionshipRepository = require('../../repositories/holi/getAllChampionshipRepository')
const createGuessLineRepository = require('../../repositories/guessLines/createGuessLineRepository')
const updateGuessLineActivityRepository = require('../../repositories/guessLines/updateGuessLineActivityRepository')

const log = coincidents.Managers.logManager

const getAllchampionshipFromHoli = () => {
  log.info('Add New and UpdateActivity Routine Started')
  getAllchampionshipRepository()
  .then((championships) => _addGuessLines(championships))
}

const _addGuessLines = (championships) => 
  championships.forEach((championship) => {
    createGuessLineRepository(championship)
      .then((guessLine) => _updateChampionshipActivity(guessLine, championship))
  })

const _updateChampionshipActivity = (guessLine, championship) => {
  if (!guessLine.isNew) {
    updateGuessLineActivityRepository(guessLine, championship)
  }
}

const cronJob = () => new CronJob(cronTime, getAllchampionshipFromHoli, null, true, 'America/Sao_Paulo')

module.exports = {
  getAllchampionshipFromHoli,
  cronJob
}