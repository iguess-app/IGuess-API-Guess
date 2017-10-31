'use strict'

const createGuessLeagueService = require('./createGuessLeagueService')
const getGuessLeagueService = require('./getGuessLeagueService')
const inviteResponseService = require('./inviteResponseService')
const inviteToGuessLeagueService = require('./inviteToGuessLeagueService')
const listGuessLeagueService = require('./listGuessLeagueService')
const putCaptainService = require('./putCaptainService')
const quitCaptainService = require('./quitCaptainService')
const quitGuessLeagueService = require('./quitGuessLeagueService')

module.exports = {
  createGuessLeagueService,
  getGuessLeagueService,
  inviteResponseService,
  inviteToGuessLeagueService,
  listGuessLeagueService,
  putCaptainService,
  quitCaptainService,
  quitGuessLeagueService
}