'use strict'

const ONE_QUANTITY = 1
const INDEX_TO_RANKING_POSITION = 1

const orderUsersArrayByPontuation = (guessLeague) => {
  const objWithRankingPosition = _getRankingPositionByPontuation(guessLeague)
  guessLeague.players.sort((playerA, playerB) => playerB.totalPontuation - playerA.totalPontuation)

  guessLeague.players.map((player) => {
    player.rankingPosition = objWithRankingPosition[player.totalPontuation].rankingPosition
    return player
  })

  return guessLeague
}

const _getRankingPositionByPontuation = (guessLeague) => {
  const objectWithQuantities = guessLeague.players.reduce((acumulator, player) => {
    if (acumulator[player.totalPontuation]) {
      acumulator[player.totalPontuation].quantityOfUsersWithThisPontuation += ONE_QUANTITY
      return acumulator
    }
    acumulator[player.totalPontuation] = {
      totalPontuation: player.totalPontuation,
      quantityOfUsersWithThisPontuation: ONE_QUANTITY
    }
    return acumulator
  }, {})

  const arrayWithQuantities = Object.values(objectWithQuantities) 
  arrayWithQuantities.sort((quantityObjA, quantityObjB) => quantityObjB.totalPontuation - quantityObjA.totalPontuation)

  const arrayWithRankingPosition = arrayWithQuantities.map((quantityObj, index) => {
    quantityObj.rankingPosition = index + INDEX_TO_RANKING_POSITION
    return quantityObj
  })

  const objWithRankingPosition = arrayWithRankingPosition.reduce((acumulator, rankingPositionObj) => {
    acumulator[rankingPositionObj.totalPontuation] = rankingPositionObj
    return acumulator
  }, {})

  return objWithRankingPosition
}

module.exports = orderUsersArrayByPontuation