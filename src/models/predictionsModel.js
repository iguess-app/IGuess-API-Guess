'use strict'

const mongoose = require('mongoose');

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

const Schema = mongoose.Schema

module.exports = (app) => {
  const db = app.coincidents.Managers.mongoManager
  const mongo = app.coincidents.Config.mongo
  const serverErrors = app.coincidents.Utils.errorUtils.serverErrors

  const championshipFixtureUserKeyValidator = require('./subValidations/championshipFixtureUserKey')(app)
  
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
      validate: [championshipFixtureUserKeyValidator.checkChampionshipFixtureUserKey, String(serverErrors.notchampionshipFixtureUserKeyValid)]
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

  return db.model('predictions', predictionsSchema)
}

/*eslint global-require: 0*/