'use strict'

const cronTime = require('./cronTime')
const getUsersPredictionsFunctions = require('./functions/getUsersPredictionsFunctions')
const compareScoreWithPredictionAndSave = require('./functions/compareScoreWithPredictionAndSave')

const CronJob = require('cron').CronJob

module.exports = (app) => {
  const pontuationRules = app.coincidents.Config.pontuationRules
  const models = app.src.models
  const holiRepositories = app.src.repositories.holi
  
  const getAllChampionshipRepository = holiRepositories.getAllChampionshipRepository
  const getLastRoundRepository = holiRepositories.getLastRoundRepository
  const getFixtureByChampionshipRefAndFixtureRepository = holiRepositories.getFixtureByChampionshipRefAndFixtureRepository

  const cronJob = () => new CronJob(cronTime, () => {
    
    getAllChampionshipRepository.getAllChampionship({onlyActive: true})
      .then((championships) => 
        championships.forEach((championship) => {
          getLastRoundRepository.getLastRound({championshipRef: championship._id})
          .then((fixture) => getUsersPredictionsFunctions(fixture, models, pontuationRules))
          .then((predictionsCursorAndFixtureObj) => compareScoreWithPredictionAndSave(predictionsCursorAndFixtureObj, pontuationRules, models))
        })
      ) 
  }, null, true, 'America/Sao_Paulo')

  const updatePredictionsPontuationWithFixtureForced = (request) => getFixtureByChampionshipRefAndFixtureRepository.getFixtureByChampionshipRefAndFixture(request)
    .then((fixture) => getUsersPredictionsFunctions(fixture, models, pontuationRules))
    .then((predictionsCursorAndFixtureObj) => compareScoreWithPredictionAndSave(predictionsCursorAndFixtureObj, pontuationRules, models))
  
  cronJob()

  return updatePredictionsPontuationWithFixtureForced
}