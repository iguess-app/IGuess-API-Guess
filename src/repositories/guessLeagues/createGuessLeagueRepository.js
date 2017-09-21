'use strict'

module.exports = (app) => {
  const GuessLeague = app.src.models.guessesLeaguesModel;

  const createGuessLeague = (request, championship) =>
    GuessLeague.create(_buildGuessLeagueObj(request, championship))

  const _buildGuessLeagueObj = (request, championship) => ({
    guessLeagueName: request.guessLeagueName,
    administrators: [
      request.userRef
    ],
    inviteads: request.inviteads,
    players: [
      request.userRef
    ],
    championship: championship.championship
  })

  return createGuessLeague
}