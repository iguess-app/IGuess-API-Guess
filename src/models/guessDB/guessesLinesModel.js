'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')
const db = require('./connect')

const Schema = mongoose.Schema
const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors

const championshipEmbeddedSchema = require('../subValidations/championshipEmbeddedModel')
const optionsSchemas = require('../optionsSchemas/optionsSchemas')

const guessesLinesSchema = new Schema({
  championship: {
    type: championshipEmbeddedSchema,
    required: true
  },
  guessLineActive: {
    type: Boolean,
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