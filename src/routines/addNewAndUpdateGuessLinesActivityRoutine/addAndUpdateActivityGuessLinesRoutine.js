'use strict'

const CronJob = require('cron').CronJob
const log = require('iguess-api-coincidents').Managers.logManager

const cronTime = require('./cronTime')
const { getAllChampionshipRepository, createGuessLineRepository, updateGuessLineActivityRepository } = require('../../repositories')

const getAllchampionshipFromHoli = () => {
  log.info('Add New and UpdateActivity Routine Started')
  getAllChampionshipRepository()
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