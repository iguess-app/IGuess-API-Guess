'use strict'

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')
const coincidents = require('iguess-api-coincidents')
const queryUtils = coincidents.Utils.queryUtils

const log = coincidents.Managers.logManager

const createGuessLeague = (request, championship) =>
  GuessLeague
  .create(_buildGuessLeagueObj(request, championship))
  .then((guessLeagueCreated) => queryUtils.makeObject(guessLeagueCreated))
  .catch((err) => {
    log.error(err)
    throw err
  })

const _buildGuessLeagueObj = (request, championship) => ({
  guessLeagueName: request.guessLeagueName,
  captains: [
    request.userRef
  ],
  inviteads: request.userRefInviteads,
  players: [
    request.userRef
  ],
  championship: championship.championship
})

module.exports = createGuessLeague