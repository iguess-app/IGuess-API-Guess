'use strict'

const coincidents = require('iguess-api-coincidents')

const League = require('../../models/holiDB/leagueModel')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

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
    throw boom('notFound', dictionary.notFoundLeagues, errorCode.notFoundLeagues)
  }
  return leagues
}

const _cleanObj = (leagues) => 
  leagues.map((league) => {
    const cleanObj = league.toJSON()
    cleanObj.leagueRef = cleanObj._id
    Reflect.deleteProperty(cleanObj, '_id')
    return cleanObj
  })

module.exports = listLeaguesWithActiveLines