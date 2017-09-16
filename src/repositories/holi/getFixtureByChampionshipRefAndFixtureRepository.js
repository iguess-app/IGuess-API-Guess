'use strict'

const qs = require('querystring')

const _buildGetRoundByFixtureQS = (request) =>
  qs.stringify({
    fixture: request.fixture,
    championshipRef: request.championshipRef
  })

module.exports = (app) => {
  const requestManager = app.coincidents.Managers.requestManager
  const holiDomain = app.coincidents.Config.apis.holiUrl
  const log = app.coincidents.Managers.logManager
  const headers = {
    'language': 'en-us',
    'content-type': 'application/json'
  }
  
  const getFixtureByChampionshipRefAndFixture = (request) => {
    const url = `${holiDomain}/fixture/getFixtureByChampionshipRefAndFixture?${_buildGetRoundByFixtureQS(request)}`

    return requestManager.get(url, headers)
  }

  return {
    getFixtureByChampionshipRefAndFixture
  }
}