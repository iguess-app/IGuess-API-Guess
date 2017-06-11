'use Strict';

module.exports = (app) => {
  const GuessLines = app.coincidents.Schemas.guessesLinesSchema;

  const setPredictions = (request, dictionary) => {

    const searchQuery = {
      championship: request.championshipId
    }

    return GuessLines
      .find(searchQuery)
      .catch((err) => err)
  }

  return {
    setPredictions
  }
}