'use Strict';

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const status = app.coincidents.Utils.guessLeagueStatus;
  const GuessLeague = app.coincidents.Schemas.guessesLeaguesSchema;

  const inviteResponse = (request) => {

    const newStatus = request.invitedAccepted ? status.PLAYING : status.PLAYING;
    const searchQuery = {
      '_id': request.guessLeagueName,
      'players.userID': request.userID
    }
    const updateQuery = {
      '$set': {
        'players.$.status': newStatus
      }
    }

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
    inviteResponse
  }
}