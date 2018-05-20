'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const Utils = coincidents.Utils
const mongo = coincidents.Config.mongo
const serverErrors = Utils.errorUtils.serverErrors
const Schema = mongoose.Schema

const optionsSchemaNoIdNoVersion = {
  versionKey: false,
  _id: false
}

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
  championshipRef: {
    type: String,
    unique: true,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
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
  date: {
    type: datePeriodSchema
  },
  translateFlag: {
    type: String,
    required: true
  }
}, optionsSchemaNoIdNoVersion)

module.exports = championshipSchema