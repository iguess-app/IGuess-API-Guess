'use strict'

const coincidents = require('iguess-api-coincidents')

const requestManager = coincidents.Managers.requestManager
const holiDomain = coincidents.Config.apis.holiUrl

const getFixtureByChampionshipRefAndFixture = (request, language = 'en-us') => {
  const headersReq = {
    language,
    'content-type': 'application/json'
  }
  const urlReq = `${holiDomain}/fixture/getFixtureByChampionshipRefAndDate`

  return requestManager.get(urlReq, headersReq, request)
    .catch((err) => err.error)
}

module.exports = getFixtureByChampionshipRefAndFixture