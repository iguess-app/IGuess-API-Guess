'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const db = app.coincidents.Managers.mongoManager
  const mongo = app.coincidents.Config.mongo
  const serverErrors = app.coincidents.Utils.errorUtils.serverErrors

  const championshipUserKeyValidator = require('./subValidations/championshipUserKey')

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
      validate: [championshipUserKeyValidator.checkChampionshipUserKey, String(serverErrors.notchampionshipUserKeyValid)]
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

  return db.model('pontuations', pontuationsSchema)
}

/*eslint global-require: 0*/