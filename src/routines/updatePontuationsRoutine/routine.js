'use strict'

const { log } = require('iguess-api-coincidents').Managers

const getUsersPredictionsFunctions = require('./functions/getUsersPredictionsFunctions')
const compareScoreWithPredictionAndSave = require('./functions/compareScoreWithPredictionAndSave')
const { getAllChampionshipRepository, getLastRoundRepository } = require('../../repositories')
const { pageAliases } = require('../../../config')

const TEN_SECONDS = 10000
const PAGE_ALIAS = pageAliases.previousEqualPage

const fireRoutine = () => {
  log.info('==================> ROUTINE STARTED: update Pontuations <==================')
  const filter = {
    onlyActive: true
  }
  getAllChampionshipRepository(filter)
    .then((championships) =>
      championships.map((championship) => {
        const championshipFilter = {
          championshipRef: championship._id.toString(),
          page: PAGE_ALIAS
        }
        return getLastRoundRepository(championshipFilter)
          .then((matchDay) => getUsersPredictionsFunctions(matchDay))
          .then((predictionsCursorAndMatchDayObj) => compareScoreWithPredictionAndSave(predictionsCursorAndMatchDayObj))
      })
    )
    .catch((err) => log.error(err))
}

setInterval(fireRoutine, TEN_SECONDS)