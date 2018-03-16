'use strict'

const Championship = require('../../models/holiDB/championshipModel')

const listLeaguesWithActiveLines = (payload) => {
  const searchQuery = {
    league: payload.leagueRef,
    championshipActive: true
  }

  const projectionQuery = {
    league: 0,
    championshipActive: 0,
    date: 0
  }

  return Championship.find(searchQuery, projectionQuery)
    .then((championships) => _cleanObj(championships))
}

const _cleanObj = (championships) => championships.map((championship) => championship.toJSON())

module.exports = listLeaguesWithActiveLines