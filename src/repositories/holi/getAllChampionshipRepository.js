'use strict'

const qs = require('querystring')

const _buildQS = (request) =>
  qs.stringify({
    onlyActive: request.onlyActive ? request.onlyActive : true
  })

module.exports = (app) => {
  const requestManager = app.coincidents.Managers.requestManager
  const holiDomain = app.coincidents.Config.apis.holiUrl

  const getAllChampionship = (request, language = 'en-us') => {
    const headersReq = {
      language,
      'content-type': 'application/json'
    }
    const urlReq = `${holiDomain}/championship/getAllchampionship?${_buildQS(request)}`

    return requestManager.get(urlReq, headersReq)
  }


  return {
    getAllChampionship
  }
}