'use strict';

module.exports = (app) => {
  const addUserToGuessLineRepository = app.src.repositories.guessLines.addUserToGuessLineRepository

  const addUserToGuessLine = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return addUserToGuessLineRepository.addUserToGuessLine(request, dictionary)
  }

  return {
    addUserToGuessLine
  }
}