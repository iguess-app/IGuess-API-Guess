'use strict'

const { log } = require('iguess-api-coincidents').Managers

const getUsersPredictionsFunctions = require('./functions/getUsersPredictionsFunctions')
const compareScoreWithPredictionAndSave = require('./functions/compareScoreWithPredictionAndSave')
const { getAllChampionshipRepository, getLastRoundRepository } = require('../../repositories')

const fireRoutine = () => {
  log.info('==================> ROUTINE STARTED: update Pontuations <==================')
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

const TEN_SECONDS = 10000
setInterval(fireRoutine, TEN_SECONDS)