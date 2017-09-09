'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const db = app.coincidents.Managers.mongoManager
  const mongo = app.coincidents.Config.mongo
  const serverErrors = app.coincidents.Utils.errorUtils.serverErrors
  const userErrors = app.coincidents.Utils.errorUtils.userErrors

  const validateFixture = require('./subValidations/fixture')(app)
  const championshipEmbeddedSchema = require('./subValidations/championshipEmbeddedModel')(app)
  const championshipUserKeyValidator = require('./subValidations/championshipUserKey')

  const pontuationByFixtureSchema = new Schema({
    fixture: {
      type: Mixed,
      required: true,
      validate: [validateFixture, String(userErrors.notValidFixture)]
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
    championship: {
      type: championshipEmbeddedSchema,
      required: true
    },
    totalPontuation: {
      type: Number,
      required: true
    },
    pontuationByFixture: {
      type: [pontuationByFixtureSchema]
    }
  }, optionsSchemas.versionKeyDisable)

  return db.model('pontuations', pontuationsSchema)
}

/*eslint global-require: 0*/