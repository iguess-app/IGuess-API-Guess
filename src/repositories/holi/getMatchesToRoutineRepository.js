'use strict'

const coincidents = require('iguess-api-coincidents')

const Match = require('../../models/holiDB/matchModel')

const { dateManager } = coincidents.Managers
const { queryUtils } = coincidents.Utils

const getMatches = async (request) => {
  const matches = await Match.find(_buildSearchQuery(request, request.dateReference))
  _checkMatchesErrors(matches, request)

  return {
    matches: matches.map((match) => queryUtils.makeObject(match))
  }
}

const _buildSearchQuery = (request, matchDayDateObj) => {
  const initOfTheDay = dateManager.getISODateInitDay(request.userTimezone, matchDayDateObj)
  const finalOfTheDay = dateManager.getISODateFinalDay(request.userTimezone, matchDayDateObj)
  const searchQuery = {
    championshipRef: request.championshipRef,
    initTime: {
      $gte: dateManager.setOneDayLess(initOfTheDay),
      $lte: dateManager.addOneDayMore(finalOfTheDay)
    }
  }
  return searchQuery
}

const _checkMatchesErrors = (matches, request) => {
  if (!matches.length) {
    throw Error(`championshipRef[${request.championshipRef}] at date[${request.dateReference}] does not have any match`)
  }
}

module.exports = getMatches