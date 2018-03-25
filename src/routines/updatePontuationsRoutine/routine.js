'use strict'

const coincidents = require('iguess-api-coincidents')

const getUsersPredictionsFunctions = require('./functions/getUsersPredictionsFunctions')
const compareScoreWithPredictionAndSave = require('./functions/compareScoreWithPredictionAndSave')
const { getAllChampionshipRepository, getMatchesRepository } = require('../../repositories')
const { pageAliases } = require('../../../config')

const { log, dateManager } = coincidents.Managers
const forcedDate = coincidents.Config.updatePontuationRoutine
const dictionary = coincidents.Translate.gate.selectLanguage()
const TEN_SECONDS = 10000

const fireRoutine = () => {
  log.info('==================> ROUTINE STARTED: update Pontuations <==================')
  const championshipsFilter = {
    onlyActive: true
  }
  getAllChampionshipRepository(championshipsFilter)
    .then((championships) =>
      championships.map((championship) => {
        const matchesFilter = {
          championshipRef: championship._id.toString(),
          dateReference: forcedDate.dayForced || dateManager.getISODateInitDay(),
          page: pageAliases.askedPage,
          routine: true
        }
        return getMatchesRepository(matchesFilter, dictionary)
          .then((matchDay) => getUsersPredictionsFunctions(matchDay.matches))
          .then((predictionsCursorAndMatchDayObj) => compareScoreWithPredictionAndSave(predictionsCursorAndMatchDayObj))
          .catch((err) => log.error(err))
      })
    )
    .catch((err) => log.error(err))
}

setInterval(fireRoutine, TEN_SECONDS)