'use strict'

const qs = require('querystring')

const _buildQS = (request) =>
  qs.stringify({
    championshipRef: request.championshipRef
  })

module.exports = (app) => {
  const requestManager = app.coincidents.Managers.requestManager
  const holiDomain = app.coincidents.Config.apis.holiUrl

  const getLastRound = (request, language = 'en-us') => {
    const headersReq = {
      language,
      'content-type': 'application/json'
    }
    const urlReq = `${holiDomain}/fixture/lastRound?${_buildQS(request)}`

    return requestManager.get(urlReq, headersReq)
  }


  return {
    getLastRound
  }
}