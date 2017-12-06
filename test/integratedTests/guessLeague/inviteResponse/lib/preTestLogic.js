'use strict'

const injectedRequests = require('../injectedRequests')
const GuessLeague = require('../../../../../src/models/guessDB/guessesLeaguesModel')

const QUANTITY_TO_REMOVE = 1
const NOT_AT_ARRAY = -1

module.exports = () => {
  const searchQuery = {
    'championship.championshipRef': '5872a8d2ed1b02314e088291'
  }

  return GuessLeague.findOne(searchQuery)
    .then((guessLeagueFound) => {
      _doHappyPathReponseYesPreTest(guessLeagueFound)
      _doHappyPathReponseNotPreTest(guessLeagueFound)

      guessLeagueFound.save()
    })
}

const _doHappyPathReponseYesPreTest = (guessLeagueFound) => {
  const happyPathYesResponseUserRef = injectedRequests.happyPathResponseYesRequest.headers.token
  const index = guessLeagueFound.players.findIndex((playerRef) => happyPathYesResponseUserRef === playerRef)
  if (index !== NOT_AT_ARRAY) {
    guessLeagueFound.players.splice(index, QUANTITY_TO_REMOVE)
  }

  if (guessLeagueFound.inviteads.indexOf(happyPathYesResponseUserRef) === NOT_AT_ARRAY) {
    guessLeagueFound.inviteads.push(happyPathYesResponseUserRef)
  }
}

const _doHappyPathReponseNotPreTest = (guessLeagueFound) => {
  const happyPathNotResponseUserRef = injectedRequests.happyPathResponseNotRequest.headers.token
  if (guessLeagueFound.inviteads.indexOf(happyPathNotResponseUserRef) === NOT_AT_ARRAY) {
    guessLeagueFound.inviteads.push(happyPathNotResponseUserRef)
  }
}