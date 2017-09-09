'use Strict';

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const status = app.coincidents.Utils.guessLeagueStatus;
  const GuessLeague = app.src.models.guessesLeaguesModel;

  const quitGuessLeague = (request) => {
    const searchQuery = {
      '_id': request.guessLeagueName,
      'players.userID': request.userID
    }
    const updateQuery = {
      '$set': {
        'players.$.status': status.QUITTED
      }
    }
    //TODO if is the admnistrator, dont let quit

    return GuessLeague
      .update(searchQuery, updateQuery)
      .then((queryResult) => {
        if (queryResult.nModified) {
          return true;
        }

        return false;
      })
  }

  return {
    quitGuessLeague
  }
}