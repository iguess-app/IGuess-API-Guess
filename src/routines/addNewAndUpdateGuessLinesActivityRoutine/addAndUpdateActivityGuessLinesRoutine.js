'use strict'

const Promise = require('bluebird')
const CronJob = require('cron').CronJob
const { log } = require('iguess-api-coincidents').Managers

const cronTime = require('./cronTime')
const { getAllChampionshipRepository, createGuessLineRepository, updateGuessLineActivityRepository } = require('../../repositories')

const fireRoutine = () => {
  log.info('==================> ROUTINE STARTED: Add New and UpdateActivity <==================')
  
  return getAllChampionshipRepository()
  .then((championships) => _addGuessLines(championships))
}

const _addGuessLines = (championships) => {
  const guessesLineArrayPromise = championships.map((championship) => 
    createGuessLineRepository(championship)
      .then((guessLine) => _updateChampionshipActivity(guessLine, championship))
  )
  return Promise.all(guessesLineArrayPromise, (justReturn) => justReturn)
}

const _updateChampionshipActivity = (guessLine, championship) => {
  if (!guessLine.isNew) {
    return updateGuessLineActivityRepository(guessLine, championship)
  }
  return guessLine
}

const cronJob = () => new CronJob(cronTime, fireRoutine, null, true, 'America/Sao_Paulo')

module.exports = {
  fireRoutine,
  cronJob
}

fireRoutine()