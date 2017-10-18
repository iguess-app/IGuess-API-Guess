const hapiPino = require('hapi-pino')
const plugins = []

const log = require('iguess-api-coincidents').Managers.logManager

const logEventsArray = ['onPostStart', 'onPostStop', 'response', 'request-error']
const hapiPinoPlugin = {
  register: hapiPino,
  options: {
    prettyPrint: true,
    logPayload: true,
    logEvents: log.isLoggableEnv() ? logEventsArray : false
  }
}
plugins.push(hapiPinoPlugin)


module.exports = plugins