'use strict'

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')
const coincidents = require('iguess-api-coincidents')

const log = coincidents.Managers.logManager

const createGuessLeague = (request, championship) =>
  GuessLeague
  .create(_buildGuessLeagueObj(request, championship))
  .catch((err) => {
    log.error(err)
    throw err
  })

const _buildGuessLeagueObj = (request, championship) => ({
  guessLeagueName: request.guessLeagueName,
  administrators: [
    request.userRef
  ],
  inviteads: request.userRefInviteads,
  players: [
    request.userRef
  ],
  championship: championship.championship
})

module.exports = createGuessLeague