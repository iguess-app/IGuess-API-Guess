'use strict'

const getLoggedUserFlag = (guessesLeagues, payload) => {
  guessesLeagues.players = guessesLeagues.players.map((playerObj) => {
    playerObj.loggedUser = playerObj.userRef === payload.userRef
    return playerObj
  })

  return guessesLeagues
}

module.exports = getLoggedUserFlag