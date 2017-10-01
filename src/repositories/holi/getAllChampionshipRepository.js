'use strict'

const coincidents = require('iguess-api-coincidents')

const requestManager = coincidents.Managers.requestManager
const holiDomain = coincidents.Config.apis.holiUrl

const getAllChampionship = (request, language = 'en-us') => {
  const headersReq = {
    language,
    'content-type': 'application/json'
  }
  const urlReq = `${holiDomain}/championship/getAllchampionship`

  return requestManager.get(urlReq, headersReq, request)
}

module.exports = getAllChampionship