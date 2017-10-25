'use strict'

const Championship = require('../../models/holiDB/championshipModel')

const getAllChampionship = (request) => {
  const searchQuery = {}
  if (request && request.onlyActive) {
    searchQuery.championshipActive = request.onlyActive
  }

  return Championship.find(searchQuery)
}

module.exports = getAllChampionship