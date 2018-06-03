'use strict'

const tokenService = require('../services/tokenService')

const verify = (request, reply) => {
  tokenService(request.headers)
    .then((verifyResponse) => reply(verifyResponse))
    .catch((err) => reply(err))
}

module.exports = verify