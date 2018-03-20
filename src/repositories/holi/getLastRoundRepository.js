'use strict'

const coincidents = require('iguess-api-coincidents')
const Boom = require('boom')

const { pageAliases } = require('../../../config')
const Round = require('../../models/holiDB/roundModel')

const queryUtils = coincidents.Utils.queryUtils
const { dateManager } = coincidents.Managers

const getLastRound = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)
  const sortQuery = _buildSortQuery(request)

  return Round.findOne(searchQuery)
    .sort(sortQuery)
    .then((lastRound) => {
      _checkErrors(lastRound, dictionary)

      return queryUtils.makeObject(lastRound)
    })
    .catch((err) => Boom.badData(err))
}

const _buildSearchQuery = (request) => {
  const searchQuery = {
    'championshipRef': request.championshipRef,
    'unixDate': _getOperatorQuery(request.pageIndicator)[request.page]
  }
  return searchQuery
}

const _buildSortQuery = (request) => {
  if (request.page === pageAliases.greaterPage || request.page === pageAliases.greaterEqualPage) {
    return {
      unixDate: 1
    }
  }
  return {
    unixDate: -1
  }
}

const _getOperatorQuery = (currentDateUserPage) => ({
  [pageAliases.previousPage]: {
    $lt: currentDateUserPage
  },
  [pageAliases.greaterPage]: {
    $gt: currentDateUserPage
  },
  [pageAliases.previousEqualPage]: {
    $lte: dateManager.getUTCToday('X')
  },
  [pageAliases.greaterEqualPage]: {
    $gte: dateManager.getUTCToday('X')
  },
  [pageAliases.askedPage]: currentDateUserPage
})

const _checkErrors = (lastRound, dictionary) => {
  if (!lastRound) {
    throw Boom.notFound(dictionary.roundNotFound)
  }
}

module.exports = getLastRound