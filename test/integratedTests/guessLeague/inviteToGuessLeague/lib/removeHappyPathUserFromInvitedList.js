'use strict'

const injectedRequests = require('../injectedRequests')
const GuessLeague = require('../../../../../src/models/guessDB/guessesLeaguesModel')

const QUANTITY_TO_REMOVE = 1

module.exports = () => {
  const searchQuery = {
    'championship.championshipRef': '5872a8d2ed1b02314e088291',
    'inviteads': {
      '$in': injectedRequests.happyPathRequest.payload.userRefInviteads
    }
  }
  return GuessLeague.findOne(searchQuery)
    .then((guessLeagueFound) => {
      if (!guessLeagueFound) {
        return Promise.resolve()
      }
      guessLeagueFound.inviteads.splice(
        guessLeagueFound.inviteads.indexOf(injectedRequests.happyPathRequest.payload.userRefInviteads[0]), 
        QUANTITY_TO_REMOVE
      )
      return guessLeagueFound.save()
    })
}

/*eslint no-magic-numbers: 0*/