'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment')
const Boom = require('boom')

const Round = require('../../models/holiDB/roundModel')
const queryUtils = coincidents.Utils.queryUtils

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
    'unixDate': _getOperatorQuery(request.currentDateUserPage)[request.page]
  }
  return searchQuery
}

const _buildSortQuery = (request) => {
  if (request.page === 'next') {
    return {
      unixDate: 1
    }
  }
  return {
    unixDate: -1
  }
}

const _getOperatorQuery = (currentDateUserPage) => ({
  previous: {
    $lt: currentDateUserPage
  },
  next: {
    $gt: currentDateUserPage
  },
  near: {
    $lte: moment().format('X')
  }
})

const _checkErrors = (lastRound, dictionary) => {
  if (!lastRound) {
    throw Boom.notFound(dictionary.roundNotFound)
  }
}

module.exports = getLastRound