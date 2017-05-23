'use Strict';

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const GuessLeague = app.coincidents.Schemas.guessesLeaguesSchema;

  const getGuessLeague = (request) => {

    const searchQuery = {
      guessLeagueName: request.guessLeagueName
    }

    return GuessLeague.findOne(searchQuery)
      .then((guessLeague) =>
        QueryUtils.makeObject(guessLeague)
      )
      .catch((err) => err)
  }

  return {
    getGuessLeague
  }
}