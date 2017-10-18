'use strict'

const queryUtils = require('iguess-api-coincidents').Utils.queryUtils

const CHAMPIONSHIP_POSITION = 0
const USER_POSITION = 1

const checkChampionshipUserKey = (key) => {
  const deconstructedKey = key.split('_')

  return queryUtils.isValidId(deconstructedKey[CHAMPIONSHIP_POSITION]) &&
    queryUtils.isValidId(deconstructedKey[USER_POSITION])
}

module.exports = checkChampionshipUserKey