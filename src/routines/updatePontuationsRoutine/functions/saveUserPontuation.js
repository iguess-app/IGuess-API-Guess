'use strict'

const Pontuation = require('../../../models/guessDB/pontuationsModel')
const moment = require('moment')

const saveUserPontuation = (userPrediction, match) => {

  const searchQuery = {
    championshipUserKey: `${userPrediction.championshipRef}_${userPrediction.userRef}`
  }
  return Pontuation.findOne(searchQuery)
    .then((userPontuation) => {
      const matchDayDate = moment(match.initTime).format('DD/MM/YYYY')
      if (!userPontuation) {
        return _addNewUserPontuationDoc(userPrediction, matchDayDate)
      }
      const pontuationByMatchDayAlreadySettedIndex = 
        userPontuation.pontuationByMatchDay.findIndex((matchDayPontuation) => matchDayPontuation.day === moment(match.initTime).format('DD/MM/YYYY'))
      if (_thereIsFixturePontuationAlready(pontuationByMatchDayAlreadySettedIndex)) {
        return _updateFixtureUserPontuation(userPontuation, userPrediction, pontuationByMatchDayAlreadySettedIndex)
      }

      return _createNewFixturePontuation(matchDayDate, userPrediction, userPontuation)
    })
}

const _addNewUserPontuationDoc = (userPrediction, matchDayDate) => {
  const newPontuationObj = {
    championshipUserKey: `${userPrediction.championshipRef}_${userPrediction.userRef}`,
    userRef: userPrediction.userRef,
    championshipRef: userPrediction.championshipRef,
    totalPontuation: userPrediction.matchPontuation,
    pontuationByFixture: [{
      day: matchDayDate,
      pontuation: userPrediction.matchPontuation
    }]
  }

  return Pontuation.create(newPontuationObj)
}

const _thereIsFixturePontuationAlready = (pontuationByMatchDayAlreadySettedIndex) => pontuationByMatchDayAlreadySettedIndex >= 0

const _updateFixtureUserPontuation = (userPontuation, userPrediction, pontuationByMatchDayAlreadySettedIndex) => {
  userPontuation.pontuationByMatchDay[pontuationByMatchDayAlreadySettedIndex].pontuation+= userPontuation.matchPontuation
  userPontuation.totalPontuation = _calculateTotalPontuation(userPontuation)

  return userPontuation.save()
}

const _calculateTotalPontuation = (userPontuation) => 
  userPontuation.pontuationByMatchDay
    .reduce((prevValue, matchDayPontuation) => prevValue + matchDayPontuation.pontuation, 0)

  const _createNewFixturePontuation = (matchDayDate, userPrediction, userPontuation) => {
  const newMatchDayPontuation = {
    day: matchDayDate,
    pontuation: userPrediction.matchPontuation
  }
  userPontuation.pontuationByMatchDay.push(newMatchDayPontuation)
  userPontuation.totalPontuation = _calculateTotalPontuation(userPontuation)

  return userPontuation.save()
}

module.exports = saveUserPontuation

/*eslint max-params: [2, 4]*/
/*eslint no-magic-numbers: 0*/

//TODO: refatorar toda essa funcao