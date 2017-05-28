'use Strict';

module.exports = (app) => {
  const GuessLeague = app.coincidents.Schemas.guessesLeaguesSchema;

  const createGuessLeague = (request) => {
    //TODO Check if the championshipID exists
    //TODO Check if all over the users exists

    const GuessLeagueObj = {
      guessLeagueName: request.guessLeagueName,
      administrator: request.userID,
      inviteads: request.inviteads,
      players: [{
        userName: request.userID
      }],
      championship: request.championship
    }

    return GuessLeague
      .create(GuessLeagueObj)
      .then((guessLeague) => {
        const guessLeagueCreated = true;

        return {
          guessLeagueCreated,
          guessLeague
        };
      })
      .catch((err) =>
        err
      )
  }

  return {
    createGuessLeague
  }
}