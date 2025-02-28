'use strict'

const mongoose = require('mongoose');
const coincidents = require('iguess-api-coincidents')
const db = require('./connect')

const optionsSchemas = require('../optionsSchemas/optionsSchemas')

const Utils = coincidents.Utils
const mongo = coincidents.Config.mongo
const Schema = mongoose.Schema
const serverErrors = Utils.errorUtils.serverErrors

const championshipSchema = new Schema({
  championshipRef: {
    type: String,
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
  translateFlag: {
    type: String,
    required: true
  }
}, optionsSchemas._idAndVersionKeyDisable)

const guessesLeaguesSchema = new Schema({
  captains: {
    type: [{
      type: String,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    }],
    required: true
  },
  guessLeagueName: {
    type: String,
    required: true
  },
  players: {
    type: [{
      type: String,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    }],
    required: true
  },
  championship: {
    type: championshipSchema,
    required: true
  },
  inviteads: {
    type: [{
      type: String,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    }]
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('guessesleagues', guessesLeaguesSchema)