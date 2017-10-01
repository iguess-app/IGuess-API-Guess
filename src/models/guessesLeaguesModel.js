'use strict'

const mongoose = require('mongoose');
const coincidents = require('iguess-api-coincidents')

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

const Managers = coincidents.Managers
const Utils = coincidents.Utils
const mongo = coincidents.Config.mongo
const db = Managers.mongoManager
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
  }
}, optionsSchemas._idAndVersionKeyDisable)

const guessesLeaguesSchema = new Schema({
  administrators: {
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