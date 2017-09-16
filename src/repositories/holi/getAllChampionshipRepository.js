'use strict'

const qs = require('querystring')

const _buildQS = (request) =>
  qs.stringify({
    onlyActive: request.onlyActive ? request.onlyActive : true
  })

module.exports = (app) => {
  const requestManager = app.coincidents.Managers.requestManager
  const holiDomain = app.coincidents.Config.apis.holiUrl
  const log = app.coincidents.Managers.logManager
  
  const headers = {
    'language': 'en-us',
    'content-type': 'application/json'
  }

  const getAllChampionship = (request) => {
    const url = `${holiDomain}/championship/getAllchampionship?${_buildQS(request)}`
    
    return requestManager.get(url, headers)
  }


  return {
    getAllChampionship
  }
}