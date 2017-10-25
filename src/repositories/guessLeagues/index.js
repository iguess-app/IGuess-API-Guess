'use strict'

const createGuessLeagueRepository = require('./createGuessLeagueRepository')
const getGuessLeagueRepository = require('./getGuessLeagueRepository')
const inviteResponseRepository = require('./inviteResponseRepository')
const inviteToGuessLeagueRepository = require('./inviteToGuessLeagueRepository')
const listGuessLeagueRepository = require('./listGuessLeagueRepository')
const putAdministratorRepository = require('./putAdministratorRepository')
const quitAdministrationRepository = require('./quitAdministrationRepository')
const quitGuessLeagueRepository = require('./quitGuessLeagueRepository')

module.exports= {
  createGuessLeagueRepository,
  getGuessLeagueRepository,
  inviteResponseRepository,
  inviteToGuessLeagueRepository,
  listGuessLeagueRepository,
  putAdministratorRepository,
  quitAdministrationRepository,
  quitGuessLeagueRepository
}