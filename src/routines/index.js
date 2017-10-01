'use strict'

const addNewAndUpdateGuessLinesActivityRoutine = require('./addNewAndUpdateGuessLinesActivityRoutine/addAndUpdateActivityGuessLinesRoutine').cronJob()
const updatePontuationsRoutine = require('./updatePontuationsRoutine/updateGuessLinesPredictionsPontuationsRoutine').cronJob()

module.exports = {
  addNewAndUpdateGuessLinesActivityRoutine,
  updatePontuationsRoutine
}