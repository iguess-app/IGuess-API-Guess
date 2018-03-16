'use strict'

const Championship = require('../../models/holiDB/championshipModel')

const listLeaguesWithActiveLines = (leagueRef) => {
  const searchQuery = {
    league: leagueRef,
    championshipActive: true
  }

  return Championship.count(searchQuery)
}

module.exports = listLeaguesWithActiveLines