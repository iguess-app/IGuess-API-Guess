'use Strict';

const Boom = require('boom')

module.exports = (app) => {
  const GuessLines = app.coincidents.Schemas.guessesLinesSchema;
  const Championship = app.coincidents.Schemas.championshipSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const ErrorUtils = app.coincidents.Utils.errorUtils;

  const addGuessLine = (request, dictionary) => {

    const searchQuery = {
      _id: request.championshipId
    }

    return Championship.findById(searchQuery)
      .then((championshipFound) => {
        if (!championshipFound) {
          throw Boom.notFound(dictionary.championshipNotFound)
        }
        const championshipObj = QueryUtils.makeObject(championshipFound)
        const guessLineObj = {
          championshipRef: request.championshipId,
          championship: {
            league: championshipObj.league,
            season: championshipObj.season,
            championship: championshipObj.championship
          }
        }

        return GuessLines
          .create(guessLineObj)
          .then((doc) => _buildGuessLineObj(doc))
          .catch((err) =>
            ErrorUtils.treatErrors(err, dictionary)
          )
      })
  }

  const _buildGuessLineObj = (doc) => {
    const guessLineCreated = QueryUtils.makeObject(doc)
    guessLineCreated.id = guessLineCreated._id.toString()
    Reflect.deleteProperty(guessLineCreated, '_id')

    return guessLineCreated
  }

  return {
    addGuessLine
  }
}