'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const cacheManager = coincidents.Managers.cacheManager

const getSession = async (headers, dictionary) => {    
  const session = await cacheManager.get(headers.token)
  if (session && session.hardwareFingerPrint === headers.hardware_fingerprint) {
    return session
  }

  return Promise.reject(Boom.unauthorized(dictionary.sessionExpired))
}

module.exports = {
  getSession
}