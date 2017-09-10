///* eslint-disable */

'use strict'

const cronTime = require('../cronTime')
const calculatePontuations = require('./functions/calculatePontuationsFunction')()

const qs = require('querystring')
const CronJob = require('cron').CronJob

const fixtureCHUMBADA = 23
const championshipCHUMBADO = '5872a8d2ed1b02314e088291'

const _buildQueryString = () =>
  qs.stringify({
    fixture: fixtureCHUMBADA,
    championshipRef: championshipCHUMBADO
  })

const _getUsersPredictionsAndSetPontuations = (fixture, models, pontuationRules) => {

  return _getPredictions(models.predictionsModel)
    .then((predictions) => _compareScoreWithPrediction(predictions, fixture, pontuationRules, models))
}

const _getPredictions = (Predictions) => {
  //TODO usar um cursor para interar e não deixar tao custo
  //TODO testar com uma quantidade alta de massa para verificar o flow
  const searchQuery = {
    'championshipFixtureUserKey': {
      '$regex': `${championshipCHUMBADO}_${fixtureCHUMBADA}`,
    }
  }

  return Predictions.find(searchQuery)
}

const _compareScoreWithPrediction = (usersPredictions, fixture, pontuationRules, models) => {
  usersPredictions.forEach((userPredictions) => {
    let fixturePontuation = 0
    fixture.games.forEach((game) => {
      userPredictions.guesses.map((guess) => {
        if (game._id === guess.matchRef) {
          guess.pontuation = calculatePontuations.returnPontuation(game, guess, pontuationRules)
          fixturePontuation += guess.pontuation
        }

        return guess
      })
    })
    userPredictions.fixturePontuation = fixturePontuation
    userPredictions.save()
    _saveUserPontuation(fixturePontuation, userPredictions, fixture, models.pontuationsModel)
  })
}

const _saveUserPontuation = (fixturePontuation, userPredictions, fixture, Pontuations) => {

  const searchQuery = {
    championshipUserKey: `${fixture.championshipRef}_${userPredictions.userRef}`
  }
  Pontuations.findOne(searchQuery)
    .then((userPontuation) => {
      if (!userPontuation) {
        return _addNewUserPontuationDoc(fixturePontuation, userPredictions, fixture, Pontuations)
      }
      const pontuationByFixtureAlreadySettedIndex = userPontuation.pontuationByFixture.findIndex((fixtureSinglePontuation) => fixtureSinglePontuation.fixture === fixture.fixture)
      if (pontuationByFixtureAlreadySettedIndex >= 0) {
        userPontuation.pontuationByFixture[pontuationByFixtureAlreadySettedIndex].pontuation = fixturePontuation
        
        return userPontuation.save()
      }
      const newFixturePontuation = {
        fixture: fixture.fixture,
        pontuation: fixturePontuation
      }
      userPontuation.totalPontuation += fixturePontuation
      userPontuation.pontuationByFixture.push(newFixturePontuation)

      return userPontuation.save()
    })
}

const _addNewUserPontuationDoc = (fixturePontuation, userPredictions, fixture, Pontuations) => {
  const newPontuationObj = {
    championshipUserKey: `${fixture.championshipRef}_${userPredictions.userRef}`,
    userRef: userPredictions.userRef,
    championshipRef: fixture.championshipRef,
    totalPontuation: fixturePontuation,
    pontuationByFixture: [{
      fixture: fixture.fixture,
      pontuation: fixturePontuation
    }]
  }

  return Pontuations.create(newPontuationObj)
}

module.exports = (app) => {
  const pontuationRules = app.coincidents.Config.pontuationRules
  const requestManager = app.coincidents.Managers.requestManager
  const log = app.coincidents.Managers.logManager
  const models = app.src.models

  const cronJob = () => new CronJob(cronTime, updatePredictionsPontuation, null, true, 'America/Sao_Paulo')

  const updatePredictionsPontuation = () => {
    const url = `${app.coincidents.Config.apis.holiUrl}/fixture/getFixtureByChampionshipRefAndFixture?${_buildQueryString()}`
    const headers = {
      'language': 'en-us',
      'content-type': 'application/json'
    }
    requestManager.get(url, headers)
      .then((fixture) => _getUsersPredictionsAndSetPontuations(fixture, models, pontuationRules))
      .catch((err) => log.error(err))
  }

  cronJob()

  return updatePredictionsPontuation
}

/*eslint max-params: [2, 4]*/