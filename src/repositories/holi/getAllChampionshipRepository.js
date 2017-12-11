'use strict'

const Championship = require('../../models/holiDB/championshipModel')

const getAllChampionship = (request) => {
  const searchQuery = {}
  if (request && request.onlyActive) {
    searchQuery.championshipActive = request.onlyActive
  }

  const projectionQuery = {
    date: 0
  }

  return Championship.find(searchQuery, projectionQuery)
}

module.exports = getAllChampionship