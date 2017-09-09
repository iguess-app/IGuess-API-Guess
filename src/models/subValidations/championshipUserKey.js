'use strict'

const CHAMPIONSHIP_POSITION = 0
const USER_POSITION = 1

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const checkChampionshipUserKey = (key) => {
  const deconstructedKey = key.split('_')

  return ObjectId.isValid(deconstructedKey[CHAMPIONSHIP_POSITION]) &&
    ObjectId.isValid(deconstructedKey[USER_POSITION])
}

module.exports = {
  checkChampionshipUserKey
}