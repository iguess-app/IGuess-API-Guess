'use strict'

const calculatePontuations = require('./calculatePontuationsFunction')
const saveUserPontuation = require('./saveUserPontuation')

const compareScoreWithPrediction = (predictionCursorAndMatchObjArray) => {
  predictionCursorAndMatchObjArray.map((predictionCursorAndMatchObj) => {

    xablau(predictionCursorAndMatchObj)
    .then(() => xablau())

/*     predictionCursorAndMatchObj.cursor.on('data', (userPrediction) => {
      let matchPontuation = 0
      matchPontuation = calculatePontuations(predictionCursorAndMatchObj.match, userPrediction.guess) 

      userPrediction.matchPontuation = matchPontuation
      userPrediction.save()
      
      saveUserPontuation(userPrediction, predictionCursorAndMatchObj.match)
    }) */

  })
}

module.exports = compareScoreWithPrediction


const testNext = (predictionCursorAndMatchObj) => predictionCursorAndMatchObj.cursor.next()

const xablau = (predictionCursorAndMatchObj) => 
  testNext(predictionCursorAndMatchObj)
  .then((userPrediction) => {
    let matchPontuation = 0
    matchPontuation = calculatePontuations(predictionCursorAndMatchObj.match, userPrediction.guess) 
    userPrediction.matchPontuation = matchPontuation
    return Promise.all([
      userPrediction.save(),
      saveUserPontuation(userPrediction, predictionCursorAndMatchObj.match)
    ])
  })