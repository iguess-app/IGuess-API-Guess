'use strict'

const Championship = require('../../models/holiDB/championshipModel')

const getAllChampionship = (request) => {
  const searchQuery = {}

  return Championship.find(searchQuery)
}

module.exports = getAllChampionship