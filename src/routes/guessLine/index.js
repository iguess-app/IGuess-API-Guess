'use strict'

const addUserToGuessLineRoutes = require('./addUserToGuessLineRoutes')
const availabilityRoutes = require('./availabilityRoutes')
const forceRoutinesRoutes = require('./forceRoutinesRoutes')
const getGuessLineRoutes = require('./getGuessLineRoutes')
const listGuessesLinesRoutes = require('./listGuessesLinesRoutes')
const setPredictionsRoutes = require('./setPredictionsRoutes')

module.exports = {
  addUserToGuessLineRoutes,
  availabilityRoutes,
  forceRoutinesRoutes,
  getGuessLineRoutes,
  listGuessesLinesRoutes,
  setPredictionsRoutes
}