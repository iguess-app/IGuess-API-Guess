'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')
const db = require('./connect')

const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors
const Schema = mongoose.Schema

const championshipMatchUserKeyValidator = require('../subValidations/championshipMatchUserKey')
const optionsSchemas = require('../optionsSchemas/optionsSchemas')

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
    validate: [championshipMatchUserKeyValidator, String(serverErrors.notchampionshipMatchUserKeyValid)]
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
  predictionSentDate: {
    type: Date,
    required: true
  },
  guess: {
    type: guessSchema,
    required: true
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('predictions', predictionsSchema)

//TODO: Adicionar qual tipo de jogo (Fixture) representa a match