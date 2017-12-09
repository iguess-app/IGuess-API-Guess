
'use strict'

const orderUsersArrayByPontuation = (guessLeague) => {
  guessLeague.players.sort((playerA, playerB) => playerB.totalPontuation - playerA.totalPontuation)

  return guessLeague
}

module.exports = orderUsersArrayByPontuation