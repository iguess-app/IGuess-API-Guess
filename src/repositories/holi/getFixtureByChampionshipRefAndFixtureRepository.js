'use strict'

const qs = require('querystring')

const _buildGetRoundByFixtureQS = (request) =>
  qs.stringify({
    date: request.date,
    championshipRef: request.championshipRef
  })

module.exports = (app) => {
  const requestManager = app.coincidents.Managers.requestManager
  const holiDomain = app.coincidents.Config.apis.holiUrl

  
  const getFixtureByChampionshipRefAndFixture = (request, language = 'en-us') => {
    const headersReq = {
      language,
      'content-type': 'application/json'
    }
    const urlReq = `${holiDomain}/fixture/getFixtureByChampionshipRefAndDate?${_buildGetRoundByFixtureQS(request)}`

    return requestManager.get(urlReq, headersReq)
    .catch((err) => err.error)
  }

  return {
    getFixtureByChampionshipRefAndFixture
  }
}