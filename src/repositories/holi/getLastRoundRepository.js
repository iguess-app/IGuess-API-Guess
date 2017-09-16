'use strict'

const qs = require('querystring')

const _buildQS = (request) =>
  qs.stringify({
    newestStarted: true,
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

  const getLastRound = (request) => {
    const url = `${holiDomain}/fixture/lastRound?${_buildQS(request)}`

    return requestManager.get(url, headers)
  }


  return {
    getLastRound
  }
}