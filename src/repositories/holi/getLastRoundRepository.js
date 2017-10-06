'use strict'

const coincidents = require('iguess-api-coincidents')
const moment = require('moment')
const Boom = require('boom')

const Round = require('../../models/holiDB/roundModel')
const queryUtils = coincidents.Utils.queryUtils

const getLastRound = (request, dictionary) => {
  const searchQuery = _buildSearchQuery(request)
  
    return Round.findOne(searchQuery)
      .then((lastRound) => {
        _checkErrors(lastRound, dictionary)
  
        return queryUtils.makeObject(lastRound)
      })
      .catch((err) => Boom.badData(err))
}

const _buildSearchQuery = (reqBody) => {
  const todayWithNoHour = moment().format('DD/MM/YYYY')

  const searchQuery = {
    'championshipRef': reqBody.championshipRef,
    'unixDate': moment(todayWithNoHour, 'DD/MM/YYYY').format('X')
  }

  return searchQuery
}

const _checkErrors = (lastRound, dictionary) => {
  if (!lastRound) {
    throw Boom.notFound(dictionary.roundNotFound)
  }
}

module.exports = getLastRound