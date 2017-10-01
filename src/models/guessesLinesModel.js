'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const Schema = mongoose.Schema
const db = coincidents.Managers.mongoManager
const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors

const championshipEmbeddedSchema = require('./subValidations/championshipEmbeddedModel')
const optionsSchemas = require('./optionsSchemas/optionsSchemas')

const matchSchema = new Schema({
  matchRef: {
    type: String,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  date: {
    type: Date,
    required: true
  }
}, optionsSchemas._idAndVersionKeyDisable)

const guessesLinesSchema = new Schema({
  championship: {
    type: championshipEmbeddedSchema,
    required: true
  },
  guessLineActive: {
    type: Boolean,
    required: true
  },
  matches: {
    type: [matchSchema],
    required: true
  },
  usersAddedAtGuessLine: {
    type: [{
      type: String,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    }]
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('guesseslines', guessesLinesSchema)