'use strict'

const calculatePontuations = require('./calculatePontuationsFunction')

const compareScoreWithPredictionAndSavePontuation = (predictionCursorAndMatchObjArray) => {
   predictionCursorAndMatchObjArray.map((predictionCursorAndMatchObj) => 
    predictionCursorAndMatchObj.cursor.on('data', (userPrediction) => {
      const matchPontuation = calculatePontuations(predictionCursorAndMatchObj.match, userPrediction.guess) 
      userPrediction.matchPontuation = matchPontuation
      userPrediction.save()
    })
  )
}

module.exports = compareScoreWithPredictionAndSavePontuation