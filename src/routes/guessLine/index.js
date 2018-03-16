'use strict'

const addUserToGuessLineRoutes = require('./addUserToGuessLineRoutes')
const availabilityRoutes = require('./availabilityRoutes')
const forceRoutinesRoutes = require('./forceRoutinesRoutes')
const getGuessLineRoutes = require('./getGuessLineRoutes')
const listUserGuessesLinesRoutes = require('./listUserGuessesLinesRoutes')
const setPredictionsRoutes = require('./setPredictionsRoutes')
const listLeaguesWithActiveLinesRoutes = require('./listLeaguesWithActiveLinesRoutes')
const listLinesByLeagueRoutes = require('./listLinesByLeagueRoutes')

module.exports = {
  addUserToGuessLineRoutes,
  availabilityRoutes,
  forceRoutinesRoutes,
  getGuessLineRoutes,
  listUserGuessesLinesRoutes,
  setPredictionsRoutes,
  listLeaguesWithActiveLinesRoutes,
  listLinesByLeagueRoutes
}