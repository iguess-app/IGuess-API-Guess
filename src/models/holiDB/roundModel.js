'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const Schema = mongoose.Schema
const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors

const optionsSchemas = require('../optionsSchemas/optionsSchemas')
const db = require('./connect')

const teamSchema = new Schema({
  teamRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  league: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  fullName: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  apiFootballName: {
    type: String,
    required: true
  }
}, optionsSchemas._idAndVersionKeyDisable)

const gamesSchema = new Schema({
  homeTeam: {
    type: teamSchema,
    required: true
  },
  awayTeam: {
    type: teamSchema,
    required: true
  },
  homeTeamScore: {
    type: Number
  },
  awayTeamScore: {
    type: Number
  },
  initTime: {
    type: Date,
    required: true
  },
  ended: {
    type: Boolean,
    required: true,
    default: false
  },
  stadium: {
    type: String
  }
}, optionsSchemas.versionKeyDisable)

const roundSchema = new Schema({
  championshipRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  date: {
    type: Date,
    required: true
  },
  unixDate: {
    type: Number,
    required: true
  },
  games: {
    type: [gamesSchema],
    required: true
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('rounds', roundSchema)

//TODO: Adicionar qual tipo de jogo (Fixture) representa a match (Se é final.. semi-final... amistoso)