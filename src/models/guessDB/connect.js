'use strict'

const coincidents = require('iguess-api-coincidents')

const Managers = coincidents.Managers

const db = Managers.mongoManager()

module.exports = db