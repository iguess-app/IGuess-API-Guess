'use strict'

const Boom = require('boom')
const League = require('../../models/holiDB/leagueModel')

const listLeaguesWithActiveLines = (dictionary) => {
  const searchQuery = {
    haveActiveLines: true
  }

  const projectionQuery = {
    haveActiveLines: 0,
    serie: 0,
    countryInitials: 0
  }

  return League.find(searchQuery, projectionQuery)
    .then((leagues) => _treatErrors(leagues, dictionary))
    .then((leagues) => _cleanObj(leagues))
}

const _treatErrors = (leagues, dictionary) => {
  if (!leagues.length) {
    throw Boom.notFound(dictionary.notFoundLeagues)
  }
  return leagues
}

const _cleanObj = (leagues) => leagues.map((league) => league.toJSON())

module.exports = listLeaguesWithActiveLines