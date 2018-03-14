'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const queryUtils = coincidents.Utils.queryUtils
const { log } = coincidents.Managers
const MAX_GUESSLEAGUES_FREE_ALLOW = coincidents.Config.guess.maxGuessLeagueFreeAllow

const createGuessLeague = (request, championship, dictionary) =>
  _countHowManyGuessLeaguesTheUserIsPlayer(request)
    .then((userGuessLeagueArePlayerNumber) => _verifyIsIfAllowCreateAnotherGuessLeague(userGuessLeagueArePlayerNumber, request, dictionary))
    .then(() => GuessLeague.create(_buildGuessLeagueObj(request, championship)))
    .then((guessLeagueCreated) => queryUtils.makeObject(guessLeagueCreated))
    .catch((err) => {
      log.error(err)
      throw err
    })

const _countHowManyGuessLeaguesTheUserIsPlayer = (request) => {
  const searchQuery = {
    players: {
      $in: [request.userRef]
    }
  }

  return GuessLeague.find(searchQuery).count()
}

const _verifyIsIfAllowCreateAnotherGuessLeague = (userGuessLeagueArePlayerNumber, request, dictionary) => {
  if (userGuessLeagueArePlayerNumber >= MAX_GUESSLEAGUES_FREE_ALLOW && _userNotPremium(request)) {
    throw Boom.forbidden(dictionary.noMoreGuessLeagueAllowed)
  }
}

const _userNotPremium = () => {
  //TODO: Get dynamically if the user is premium or not
  const TEMP_RESPONSE_UNTIL_DOES_NOT_HAVE_THE_DATE = true
  return TEMP_RESPONSE_UNTIL_DOES_NOT_HAVE_THE_DATE
}

const _buildGuessLeagueObj = (request, championship) => ({
  guessLeagueName: request.guessLeagueName,
  captains: [
    request.userRef
  ],
  inviteads: request.userRefInviteads,
  players: [
    request.userRef
  ],
  championship: championship.championship
})

module.exports = createGuessLeague