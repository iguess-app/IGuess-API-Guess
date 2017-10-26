'use strict'

const getAllChampionshipRepository = require('./getAllChampionshipRepository')
const getFixtureByChampionshipRefAndDateRepository = require('./getFixtureByChampionshipRefAndDateRepository')
const getLastRoundRepository = require('./getLastRoundRepository')
const getMatchByRefRepository = require('./getMatchByRefRepository')

module.exports= {
  getAllChampionshipRepository,
  getFixtureByChampionshipRefAndDateRepository,
  getLastRoundRepository,
  getMatchByRefRepository
}