'use strict'

const addNewAndUpdateGuessLinesActivityRoutine = require('./addNewAndUpdateGuessLinesActivityRoutine/addAndUpdateActivityGuessLinesRoutine').cronJob()
const updatePontuationsRoutine = require('./updatePontuationsRoutine/routine').cronJob()

module.exports = {
  addNewAndUpdateGuessLinesActivityRoutine,
  updatePontuationsRoutine
}