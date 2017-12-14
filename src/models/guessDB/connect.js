'use strict'

const coincidents = require('iguess-api-coincidents')

const Managers = coincidents.Managers
const mongo = coincidents.Config.mongo
const GUESS_DB_URI = `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`
let address = ''

mongo.guessAddress ? address = mongo.guessAddress : address = GUESS_DB_URI
const db = Managers.mongoManager(address)

module.exports = db