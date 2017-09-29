'use strict'

const MATCH_POSITION = 0
const USER_POSITION = 2

const mongoose = require('mongoose')

module.exports = () => {
  const ObjectId = mongoose.Types.ObjectId

  const checkChampionshipFixtureUserKey = (key) => {
    const deconstructedKey = key.split('_')
    
      return ObjectId.isValid(deconstructedKey[MATCH_POSITION]) &&
        ObjectId.isValid(deconstructedKey[USER_POSITION])
  }

  return {
    checkChampionshipFixtureUserKey
  }
}

/*eslint global-require: 0*/