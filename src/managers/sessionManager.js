'use strict'

const coincidents = require('iguess-api-coincidents')

const { errorCode, errorUtils } = coincidents.Utils
const { cacheManager } = coincidents.Managers
const { boom } = errorUtils

const getSession = async (headers, dictionary) => {    
  const session = await cacheManager.get(headers.token)
  if (session && session.hardwareFingerPrint === headers.hardware_fingerprint) {
    return session
  }

  return Promise.reject(boom('unauthorized', dictionary.sessionExpired, errorCode.sessionExpired))
}

module.exports = {
  getSession
}