'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const cacheManager = coincidents.Managers.cacheManager
const SESSION_TIME = coincidents.Config.redis.sessionTime

const getSession = async (token, dictionary) => {
  const session = await cacheManager.get(token)
  if (session) {
    return session
  }

  return Promise.reject(Boom.notAcceptable(dictionary.sessionExpired))
}

module.exports = {
  getSession
}