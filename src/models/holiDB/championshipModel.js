'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const optionsSchemas = require('../optionsSchemas/optionsSchemas')
const db = require('./connect')

const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors
const Schema = mongoose.Schema

const datePeriodSchema = new Schema({
  initDate: {
    type: Date,
    required: true
  },
  finalDate: {
    type: Date,
    required: true
  }
})

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
  },
  date: {
    type: datePeriodSchema,
    required: true
  },
  translateFlag: {
    type: String,
    required: true
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('championships', championshipSchema)