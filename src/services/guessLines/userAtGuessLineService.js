'use strict';

module.exports = (app) => {
  const verifyUserAtGuessLineRepository = app.src.repositories.guessLines.verifyUserAtGuessLineRepository

  const userAtGuessLine = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return verifyUserAtGuessLineRepository(request, dictionary)
  }

  return userAtGuessLine
}