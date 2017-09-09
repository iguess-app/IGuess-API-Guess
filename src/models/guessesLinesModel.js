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
  const championshipFixtureUserKeyValidator = require('./subValidations/championshipFixtureUserKey')(app)
  const championshipEmbeddedSchema = require('./subValidations/championshipEmbeddedModel')(app)

  const fixturesSchema = new Schema({
    fixture: {
      type: Mixed,
      required: true,
      validate: [validateFixture, String(userErrors.notValidFixture)]
    },
    usersWhoAlreadySentGuesses: {
      type: [{
        type: String,
        validate: [championshipFixtureUserKeyValidator.checkChampionshipFixtureUserKey, String(serverErrors.notchampionshipFixtureUserKeyValid)]
      }]
    }
  }, optionsSchemas._idAndVersionKeyDisable)
  
  const guessesLinesSchema = new Schema({
    championship: {
      type: championshipEmbeddedSchema,
      required: true
    },  
    guessLineActive: {
      type: Boolean,
      required: true
    },
    fixtures: {
      type: [fixturesSchema],
      required: true
    },
    usersAddedAtGuessLine: {
      type: [{
        type: String,
        validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
      }]
    }
  }, optionsSchemas.versionKeyDisable)

  return db.model('guesseslines', guessesLinesSchema)
}
  /*eslint global-require: 0*/