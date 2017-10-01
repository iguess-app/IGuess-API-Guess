'use strict'

const Hapi = require('hapi')
const Config = require('iguess-api-coincidents').Config

const server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: Config.serverPort
})

module.exports = server