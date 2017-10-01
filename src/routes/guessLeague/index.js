'use strict'

const administrationsRoutes = require('./administrationsRoutes')
const createGuessLeagueRoutes = require('./createGuessLeagueRoutes')
const deleteGuessLeagueRoutes = require('./deleteGuessLeagueRoutes')
const getGuessLeagueRoutes = require('./getGuessLeagueRoutes')
const invitesGuessLeagueRoutes = require('./invitesGuessLeagueRoutes')
const listGuessLeagueRoutes = require('./listGuessLeagueRoutes')
const quitGuessLeagueRoutes = require('./quitGuessLeagueRoutes')

module.exports = {
  administrationsRoutes,
  createGuessLeagueRoutes,
  deleteGuessLeagueRoutes,
  getGuessLeagueRoutes,
  invitesGuessLeagueRoutes,
  listGuessLeagueRoutes,
  quitGuessLeagueRoutes
}