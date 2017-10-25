'use strict'

const addUserToGuessLineRepository = require('./addUserToGuessLineRepository')
const createGuessLineRepository = require('./createGuessLineRepository')
const getChampionshipAtGuessLineRepository = require('./getChampionshipAtGuessLineRepository')
const getGuessLineRepository = require('./getGuessLineRepository')
const getPontuationsRepository = require('./getPontuationsRepository')
const getPredictionsRepository = require('./getPredictionsRepository')
const listGuessesLinesRepository = require('./listGuessesLinesRepository')
const setPredictionsRepository = require('./setPredictionsRepository')
const updateGuessLineActivityRepository = require('./updateGuessLineActivityRepository')
const verifyUserAtGuessLineRepository = require('./verifyUserAtGuessLineRepository')

module.exports= {
  addUserToGuessLineRepository,
  createGuessLineRepository,
  getChampionshipAtGuessLineRepository,
  getGuessLineRepository,
  getPontuationsRepository,
  getPredictionsRepository,
  listGuessesLinesRepository,
  setPredictionsRepository,
  updateGuessLineActivityRepository,
  verifyUserAtGuessLineRepository
}