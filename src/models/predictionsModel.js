'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const db = coincidents.Managers.mongoManager
const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors
const Schema = mongoose.Schema

const championshipMatchUserKeyValidator = require('./subValidations/championshipMatchUserKey')
const optionsSchemas = require('./optionsSchemas/optionsSchemas')

const guessSchema = new Schema({
  homeTeamScoreGuess: {
    type: Number,
    required: true
  },
  awayTeamScoreGuess: {
    type: Number,
    required: true
  }
}, optionsSchemas._idAndVersionKeyDisable)

const predictionsSchema = new Schema({
  matchUserRef: {
    type: String,
    required: true,
    unique: true,
    validate: [championshipMatchUserKeyValidator, String(serverErrors.notchampionshipFixtureUserKeyValid)]
  },
  userRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  matchRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  championshipRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  matchPontuation: {
    type: Number
  },
  date: {
    type: Date,
    required: true
  },
  guesses: {
    type: guessSchema
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('predictions', predictionsSchema)