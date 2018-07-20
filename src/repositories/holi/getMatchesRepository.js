'use strict'

const coincidents = require('iguess-api-coincidents')

const { pageAliases } = require('../../../config')
const Match = require('../../models/holiDB/matchModel')

const { dateManager } = coincidents.Managers
const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { boom } = errorUtils

const getMatches = (request, dictionary) => {
  if (!request.dateReference) {
    request.dateReference = dateManager.getISODateInitDay(request.userTimezone)
  }
  
  return _getMatchDayDate(request)
    .then((matchDay) => _checkMatchDayDateErrors(matchDay, request, dictionary))
    .then((matchDay) => _getMatchesFromSomeMatchDay(matchDay, request, dictionary))
}

const _getMatchDayDate = (request) => {
  const sortMatchesQuery = _buildSortQuery(request)
  const getMatchDayQuery = _buildGetMatchDayQuery(request)
  const getMatchDayProjectionQuery = _onlyInitTimeProjection()

  return Match
    .findOne(getMatchDayQuery, getMatchDayProjectionQuery)
    .sort(sortMatchesQuery)
}

const _getMatchesFromSomeMatchDay = async (matchDay, request, dictionary) => {
  const matchDayDateObj = matchDay.initTime
  const searchQuery = _buildSearchQuery(request, matchDayDateObj)

  const matches = await Match.find(searchQuery).sort(_buildSortQuery(request))
  _checkMatchesErrors(matches, dictionary)

  const hasPastMatchDays = await _getIfHasPastMatchDay(request, matchDayDateObj)

  return {
    hasPastMatchDays,
    matches: matches.map((match) => queryUtils.makeObject(match)),
    matchDay: dateManager.getISODateInitDay(request.userTimezone, matchDayDateObj)
  }
}

const _onlyInitTimeProjection = () => ({ _id: 0, initTime: 1 })

const _buildGetMatchDayQuery = (request) => ({
  championshipRef: request.championshipRef,
  initTime: _getOperatorQuery(request.dateReference, request.userTimezone)[request.page]
})

const _buildSearchQuery = (request, matchDayDateObj) => {
  const initOfTheDay = dateManager.getISODateInitDay(request.userTimezone, matchDayDateObj)
  const finalOfTheDay = dateManager.getISODateFinalDay(request.userTimezone, matchDayDateObj)
  const searchQuery = {
    championshipRef: request.championshipRef,
    initTime: {
      $gte: request.routine ? dateManager.setOneDayLess(initOfTheDay) : initOfTheDay,
      $lte: request.routine ? dateManager.addOneDayMore(finalOfTheDay) : finalOfTheDay
    }
  }
  return searchQuery
}

const _getIfHasPastMatchDay = async (request, matchDayDateObj) => {
  //TODO: Make integrated tests for this case
  const searchQuery = {
    championshipRef: request.championshipRef,
    initTime: {
      $lt: dateManager.getISODateInitDay(request.userTimezone, matchDayDateObj)
    }
  }
  const pastMatches = await Match.find(searchQuery).count()
  return Boolean(pastMatches)
}

const _buildSortQuery = (request) => {
  if (request.page === pageAliases.nextPage || request.page === pageAliases.nearestPage) {
    return {
      initTime: 1
    }
  }
  return {
    initTime: -1
  }
}

const _getOperatorQuery = (dateReference, userTimezone) => ({
  [pageAliases.previousPage]: {
    $lt: dateManager.getISODateInitDay(userTimezone, dateReference)
  },
  [pageAliases.nextPage]: {
    $gt: dateManager.getISODateFinalDay(userTimezone, dateReference) 
  },
  [pageAliases.nearestPage]: {
    $gte: dateManager.getISODateInitDay(userTimezone, dateReference)
  },
  [pageAliases.askedPage]: {
    $gte: dateManager.getISODateInitDay(userTimezone, dateReference),
    $lte: dateManager.getISODateFinalDay(userTimezone, dateReference)
  }
})

const _checkMatchDayDateErrors = (matchDay, request, dictionary) => {
  if (!matchDay && !request.routine) {
    throw boom('notFound', dictionary.matchesNotFound, errorCode.matchesNotFound)
  }
  if (!matchDay && request.routine) {
    throw Error(`championshipRef[${request.championshipRef}] at date[${request.dateReference}] does not have any match`)
  }
  return matchDay
}

const _checkMatchesErrors = (matches, dictionary) => {
  if (!matches.length) {
    throw boom('notFound', dictionary.matchesNotFound, errorCode.matchesNotFound)
  }
}

module.exports = getMatches