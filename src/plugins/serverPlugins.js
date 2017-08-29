const hapiPino = require('hapi-pino')
const plugins = []

const hapiPinoPlugin = {
  register: hapiPino,
  options: {
    prettyPrint: true,
    logPayload: true
  }
}

plugins.push(hapiPinoPlugin)

module.exports = plugins