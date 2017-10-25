'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors
const Schema = mongoose.Schema

const db = require('./connect')
const optionsSchemas = require('../optionsSchemas/optionsSchemas')

const championshipSchema = new Schema({
  league: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  season: {
    type: String,
    required: true
  },
  championship: {
    type: String,
    required: true
  },
  championshipActive: {
    type: Boolean,
    required: true
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('championships', championshipSchema)