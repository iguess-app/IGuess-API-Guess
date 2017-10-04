'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')
const db = require('./connect')

const Schema = mongoose.Schema
const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors

const championshipUserKeyValidator = require('../subValidations/championshipUserKey')
const optionsSchemas = require('../optionsSchemas/optionsSchemas')

const pontuationByMatchDaySchema = new Schema({
  day: {
    type: String,
    required: true
  },
  pontuation: {
    type: Number,
    required: true
  }
}, optionsSchemas._idAndVersionKeyDisable)

const pontuationsSchema = new Schema({
  championshipUserKey: {
    type: String,
    required: true,
    unique: true,
    validate: [championshipUserKeyValidator, String(serverErrors.notchampionshipUserKeyValid)]
  },
  userRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  championshipRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  totalPontuation: {
    type: Number,
    required: true
  },
  pontuationByMatchDay: {
    type: [pontuationByMatchDaySchema]
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('pontuations', pontuationsSchema)