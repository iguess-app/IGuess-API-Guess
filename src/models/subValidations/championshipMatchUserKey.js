'use strict'

const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

const MATCH_POSITION = 0
const USER_POSITION = 2

const checkChampionshipMatchUserKey = (key) => {
  const deconstructedKey = key.split('_')
  
    return ObjectId.isValid(deconstructedKey[MATCH_POSITION]) &&
      ObjectId.isValid(deconstructedKey[USER_POSITION])
}

module.exports = checkChampionshipMatchUserKey

/*eslint global-require: 0*/