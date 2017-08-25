'use Strict';

const Boom = require('boom')

module.exports = (app) => {
  const GuessLines = app.coincidents.Schemas.guessesLinesSchema
  const Rounds = app.coincidents.Schemas.roundSchema

  const addUserToGuessLine = (request, dictionary) => {

    const searchQuery = {
      championshipRef: request.championshipId
    }

    return GuessLines.findOne(searchQuery)
      .then((guessLineFound) => {
        _checkErrors(guessLineFound, request, dictionary)

        guessLineFound.users.push(request.userId)
        //TODO do a push with userId and guesses(matchRef, and teams score)
        Rounds.find(searchQuery)
          .then((rounds) => {
            rounds.find((round) => round.fixture === guessLineFound.fixtures)//TODOS NUMBERS)
          })

        return guessLineFound.save()
      })
  }

  const _checkErrors = (guessLineFound, request, dictionary) => {
    if (!guessLineFound) {
      throw Boom.notFound(dictionary.guessLineNotFound)
    }

    if (guessLineFound.users.includes(request.userId)) {
      throw Boom.unauthorized(dictionary.alreadyAdd)
    }
  }

  return {
    addUserToGuessLine
  }
}