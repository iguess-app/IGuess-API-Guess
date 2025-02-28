'use strict'

const coincidents = require('iguess-api-coincidents')
const cacheManager = coincidents.Managers.cacheManager

const verify = (headers) => {
  const returnObj = {
    valid: false
  }

  return cacheManager.get(headers.token)
    .then((session) => {
      if (session) {
        returnObj.valid = true
      }

      return returnObj
    })
}

module.exports = verify