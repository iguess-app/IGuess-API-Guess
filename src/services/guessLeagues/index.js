'use strict'

const createGuessLeagueService = require('./createGuessLeagueService')
const getGuessLeagueService = require('./getGuessLeagueService')
const inviteResponseService = require('./inviteResponseService')
const inviteToGuessLeagueService = require('./inviteToGuessLeagueService')
const listGuessLeagueService = require('./listGuessLeagueService')
const putAdministratorService = require('./putAdministratorService')
const quitAdministratorService = require('./quitAdministratorService')
const quitGuessLeagueService = require('./quitGuessLeagueService')

module.exports = {
  createGuessLeagueService,
  getGuessLeagueService,
  inviteResponseService,
  inviteToGuessLeagueService,
  listGuessLeagueService,
  putAdministratorService,
  quitAdministratorService,
  quitGuessLeagueService
}