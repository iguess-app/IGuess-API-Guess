'use strict'

const coincidents = require('iguess-api-coincidents')
const Boom = require('boom')

const { pageAliases } = require('../../../config')
const Match = require('../../models/holiDB/matchModel')

const { queryUtils } = coincidents.Utils
const { dateManager } = coincidents.Managers

const getMatches = (request, dictionary) => {
  //TODO: Primeiro encontrar qual o NEXT matchDAY depois fazer a query com o range
  const sortQuery = _buildSortQuery(request)

  if (!request.dateReference) {
    request.dateReference = dateManager.getISODateInitDay(request.userTimezone)
  }

  //Pegando proximo MatchDay
  const queryGG = {
    championshipRef: request.championshipRef,
    initTime: _getOperatorQuery(request.dateReference, request.userTimezone)[request.page]
  }

  const projectionGG = { _id: 0, initTime: 1 }

  return Match
    .findOne(queryGG, projectionGG)
    .sort(sortQuery)
    .then((nextMatchDay) => {
      if (nextMatchDay) {
        request.dateReference = nextMatchDay.toJSON().initTime

        const searchQuery = _buildSearchQuery(request)

        return Match.find(searchQuery)
          .sort(sortQuery)
          .then((matches) => {
            _checkErrors(matches, dictionary)

            return {
              matches: matches.map((match) => queryUtils.makeObject(match)),
              matchDay: dateManager.getISODateInitDay(request.userTimezone, request.dateReference) //Nao inserir o dateRefence no request.. nao pode da impressao que isso veio do front.. tem q ser algo q ta na cara q é manipulacao do back
            }
          })
          .catch((err) => Boom.badData(err))

      }
      throw Boom.notFound(dictionary.matchesNotFound)
    })
}

const _buildSearchQuery = (request) => {
  const searchQuery = {
    championshipRef: request.championshipRef,
    initTime: {
      $gte: dateManager.getISODateInitDay(request.userTimezone, request.dateReference),
      $lte: dateManager.getISODateFinalDay(request.userTimezone, request.dateReference)
    }
  }
  return searchQuery
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
    $gte: dateReference
  },
  [pageAliases.askedPage]: {
    $gte: dateManager.getISODateInitDay(userTimezone, dateReference),
    $lte: dateManager.getISODateFinalDay(userTimezone, dateReference)
  }
})

const _checkErrors = (matches, dictionary) => {
  if (!matches.length) {
    throw Boom.notFound(dictionary.matchesNotFound)
  }
}

module.exports = getMatches