'use strict';

module.exports = (app) => {
  const addGuessLineRepository = app.src.repositories.guessLines.addGuessLineRepository

  const addGuessLine = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return addGuessLineRepository.addGuessLine(request, dictionary)
  }

  return {
    addGuessLine
  }
}