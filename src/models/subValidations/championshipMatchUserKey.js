'use strict'

const queryUtils = require('iguess-api-coincidents').Utils.queryUtils

const MATCH_POSITION = 0
const USER_POSITION = 1

const checkChampionshipMatchUserKey = (key) => {
  const deconstructedKey = key.split('_')

  return queryUtils.makeObjectId(deconstructedKey[MATCH_POSITION]) &&
    queryUtils.makeObjectId(deconstructedKey[USER_POSITION])
}

module.exports = checkChampionshipMatchUserKey

/*eslint global-require: 0*/