'use strict'

const CHAMPIONSHIP_POSITION = 0
const FIXTURE_POSITION = 1
const USER_POSITION = 2

const mongoose = require('mongoose')

module.exports = (app) => {
  const fixtureValidator = require('./fixture')(app)
  const ObjectId = mongoose.Types.ObjectId;

  const checkChampionshipFixtureUserKey = (key) => {
    const deconstructedKey = key.split('_')

    return fixtureValidator(deconstructedKey[FIXTURE_POSITION]) &&
      ObjectId.isValid(deconstructedKey[CHAMPIONSHIP_POSITION]) &&
      ObjectId.isValid(deconstructedKey[USER_POSITION])
  }

  return {
    checkChampionshipFixtureUserKey
  }
}

/*eslint global-require: 0*/