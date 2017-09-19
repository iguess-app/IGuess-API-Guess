'use strict'

module.exports = (app) => {
  const Pontuations = app.src.models.pontuationsModel

  const getPontuations = (request, guessLine, dictionary) => {
    const searchQuery = _buildSearchQuery(request, guessLine)

    return Pontuations.findOne(searchQuery)
  }

  const _buildSearchQuery = (request, guessLine) => {
    const searchQuery = {
      'userRef': request.userRef,
      'championshipUserKey': _championshipUserKeyChecker(request, guessLine)
    }

    return searchQuery
  }

  const _championshipUserKeyChecker = (request, guessLine) => {
    if (request.championshipRef) {
      return `${request.championshipRef}_${request.userRef}`
    }
    if (guessLine.championship) {
      return `${guessLine.championship.championshipRef}_${request.userRef}`
    }

    return null
  }

  return {
    getPontuations
  }
}