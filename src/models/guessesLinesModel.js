'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const db = app.coincidents.Managers.mongoManager
  const mongo = app.coincidents.Config.mongo
  const serverErrors = app.coincidents.Utils.errorUtils.serverErrors

  const championshipEmbeddedSchema = require('./subValidations/championshipEmbeddedModel')(app)

  const matchSchema = new Schema({
    matchRef: {
      type: String,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    },
    date: {
      type: Date,
      required: true
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
    matches: {
      type: [matchSchema],
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