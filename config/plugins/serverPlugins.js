'use strict'

const hapiPino = require('hapi-pino')
const coincidents = require('iguess-api-coincidents')

const config = coincidents.Config

const hapiPinoPlugin = {
  register: hapiPino,
  options: {
    prettyPrint: !config.isProd(),
    logPayload: true,
    logEvents: ['onPostStart', 'onPostStop', 'response', 'request-error']
  }
}

module.exports = [].concat(hapiPinoPlugin)