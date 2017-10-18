'use strict'

const queryUtils = require('iguess-api-coincidents').Utils.queryUtils

const MATCH_POSITION = 0
const USER_POSITION = 1

const checkChampionshipMatchUserKey = (key) => {
  const deconstructedKey = key.split('_')
  
  return queryUtils.isValidId(deconstructedKey[MATCH_POSITION]) &&
    queryUtils.isValidId(deconstructedKey[USER_POSITION])
}

module.exports = checkChampionshipMatchUserKey