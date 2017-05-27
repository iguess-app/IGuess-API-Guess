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
        _structureGuessLeagueObj(QueryUtils.makeObject(guessLeague))
      )
      .catch((err) =>
        err
      )
  }

  const _structureGuessLeagueObj = (guessLeague) => {
    Reflect.deleteProperty(guessLeague, '__v');
    Reflect.deleteProperty(guessLeague, '_id');

    return guessLeague
  }

  return {
    getGuessLeague
  }
}