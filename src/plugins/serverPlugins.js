const hapiPino = require('hapi-pino')
const plugins = []

module.exports = (config) => {
  const logEventsArray = ['onPostStart', 'onPostStop', 'response', 'request-error']
  const hapiPinoPlugin = {
    register: hapiPino,
    options: {
      prettyPrint: true,
      logPayload: true,
      logEvents: _checkIfEnvIsLoggable(config.env) ? logEventsArray : false
    }
  }
  plugins.push(hapiPinoPlugin)

  return plugins
}

const _checkIfEnvIsLoggable = (env) => env === 'local' || env === 'development' || env === 'homolog' || env === 'staging'