'use strict'

const captainRoutes = require('./captainRoutes')
const createGuessLeagueRoutes = require('./createGuessLeagueRoutes')
const deleteGuessLeagueRoutes = require('./deleteGuessLeagueRoutes')
const getGuessLeagueRoutes = require('./getGuessLeagueRoutes')
const invitesGuessLeagueRoutes = require('./invitesGuessLeagueRoutes')
const listGuessLeagueRoutes = require('./listGuessLeagueRoutes')
const quitGuessLeagueRoutes = require('./quitGuessLeagueRoutes')
const editGuessLeagueRoutes = require('./editGuessLeagueRoutes')
const addToGuessLeagueRoutes = require('./addToGuessLeagueRoutes')

module.exports = {
  captainRoutes,
  createGuessLeagueRoutes,
  deleteGuessLeagueRoutes,
  getGuessLeagueRoutes,
  invitesGuessLeagueRoutes,
  listGuessLeagueRoutes,
  quitGuessLeagueRoutes,
  editGuessLeagueRoutes,
  addToGuessLeagueRoutes
}