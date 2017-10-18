'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment')
const Boom = require('boom')

const Round = require('../../models/holiDB/roundModel')
const queryUtils = coincidents.Utils.queryUtils

const getLastRound = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)
  const sortQuery = {
    unixDate: -1
  }
  return Round.findOne(searchQuery)
    .sort(sortQuery)
    .then((lastRound) => {
      _checkErrors(lastRound, dictionary)

      return queryUtils.makeObject(lastRound)
    })
    .catch((err) => Boom.badData(err))
}

const _buildSearchQuery = (reqBody) => {
  const searchQuery = {
    'championshipRef': reqBody.championshipRef,
    'unixDate': {
      $lte: moment().format('X')
    }
  }
  return searchQuery
}

const _checkErrors = (lastRound, dictionary) => {
  if (!lastRound) {
    throw Boom.notFound(dictionary.roundNotFound)
  }
}

module.exports = getLastRound