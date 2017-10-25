'use strict'

const getAllChampionshipRepository = require('./getAllChampionshipRepository')
const getFixtureByChampionshipRefAndDateRepository = require('./getFixtureByChampionshipRefAndDateRepository')
const getLastRoundRepository = require('./getLastRoundRepository')

module.exports= {
  getAllChampionshipRepository,
  getFixtureByChampionshipRefAndDateRepository,
  getLastRoundRepository
}