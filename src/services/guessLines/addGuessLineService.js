'use strict';

module.exports = (app) => {
  const setPredictionsRepository = app.src.repositories.guessLines.setPredictionsRepository

  const setPredictions = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return setPredictionsRepository.setPredictions(request, dictionary)
  }

  return {
    setPredictions
  }
}