'use strict'

const mongoose = require('mongoose');

const optionsSchema = {
  versionKey: false
}

module.exports = (app) => {
  const Managers = app.coincidents.Managers
  const Utils = app.coincidents.Utils
  const mongo = app.coincidents.Config.mongo
  
  const db = Managers.mongoManager
  const Schema = mongoose.Schema
  const serverErrors = Utils.errorUtils.serverErrors
  
  const championshipSchema = new Schema({
    _id: {
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
  }, optionsSchema)
  
  const guessesLeaguesSchema = new Schema({
    administrator: {
      type: String,
      required: true
    },
    guessLeagueName: {
      type: String,
      required: true
    },
    players: {
      type: Array,
      required: true
    },
    championship: {
      type: championshipSchema,
      required: true
    },
    inviteads: {
      type: Array,
      required: true
    }
  }, optionsSchema)
  
  return db.model('guessesleagues', guessesLeaguesSchema)
} 