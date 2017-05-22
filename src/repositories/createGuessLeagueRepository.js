'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const status = app.coincidents.Utils.guessLeagueStatus;
  const GuessLeague = app.coincidents.Schemas.guessesLeaguesSchema;

  const createGuessLeague = (request) => {
    //TODO Check if the championshipID exists
    //TODO Check if all over the users exists

    const invitedPlayers = request.invited.map((invited) => ({
      userID: invited,
      status: status.INVITED
    }))

    const GuessLeagueObj = {
      _id: request.guessLeagueName,
      administrator: request.userID,
      players: invitedPlayers
    }

    return Promise.resolve(GuessLeague
      .create(GuessLeagueObj)
      .then((DBResponse) =>
        QueryUtils.makeObject(DBResponse)
      )
      .catch((err) =>
        QueryUtils.makeJSON(err)
      )
    )
  }

  return {
    createGuessLeague
  }
}