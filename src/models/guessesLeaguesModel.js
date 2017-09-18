'use strict'

const mongoose = require('mongoose');

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const Managers = app.coincidents.Managers
  const Utils = app.coincidents.Utils
  const mongo = app.coincidents.Config.mongo
  
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
    championship: championshipSchema,
    inviteads: {
      type: [{
        type: String,
        validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
      }]
    }
  }, optionsSchemas.versionKeyDisable)
  
  return db.model('guessesleagues', guessesLeaguesSchema)
} 