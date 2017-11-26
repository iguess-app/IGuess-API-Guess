'use strict'

const addNewAndUpdateGuessLinesActivityRoutine = require('./addNewAndUpdateGuessLinesActivityRoutine/addAndUpdateActivityGuessLinesRoutine').cronJob()
const updatePontuationsRoutine = require('./updatePontuationsRoutine/routine')

module.exports = {
  addNewAndUpdateGuessLinesActivityRoutine,
  updatePontuationsRoutine
}