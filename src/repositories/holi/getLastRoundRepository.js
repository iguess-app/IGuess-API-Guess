'use strict'

const coincidents = require('iguess-api-coincidents')

const requestManager = coincidents.Managers.requestManager
const holiDomain = coincidents.Config.apis.holiUrl

const getLastRound = (request, language = 'en-us') => {
  const headersReq = {
    language,
    'content-type': 'application/json'
  }
  const urlReq = `${holiDomain}/fixture/lastRound`

  return requestManager.get(urlReq, headersReq, request)
}

module.exports = getLastRound