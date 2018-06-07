'use strict'

const Promise = require('bluebird')
const coincidents = require('iguess-api-coincidents')

const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const { errorCode, errorUtils, queryUtils } = coincidents.Utils
const { log } = coincidents.Managers
const { boom } = errorUtils

const MAX_GUESSLEAGUES_FREE_ALLOW = coincidents.Config.guess.maxGuessLeagueFreeAllow

const createGuessLeague = (request, championship, dictionary) =>
  _verifyIsIfAllowCreateAnotherGuessLeague(request, dictionary)
    .then(() => _filteringUsersWhoHasMaxGuessLeagues(request, dictionary))
    .then(() => GuessLeague.create(_buildGuessLeagueObj(request, championship)))
    .then((guessLeagueCreated) => _buildResponseObj(request, guessLeagueCreated))
    .catch((err) => {
      log.error(err)
      throw err
    })

const _verifyIsIfAllowCreateAnotherGuessLeague = async (request, dictionary) => {
  const searchQuery = {
    players: {
      $in: [request.userRef]
    }
  }
  const captainGuessLeagues = await GuessLeague.find(searchQuery).count()
  
  if (captainGuessLeagues >= MAX_GUESSLEAGUES_FREE_ALLOW) {
    throw boom('forbidden', dictionary.noMoreGuessLeagueAllowed, errorCode.noMoreGuessLeagueAllowed)
  }
}

const _filteringUsersWhoHasMaxGuessLeagues = async (request) => {
  const getGuessLeagueByUserPromise = request.userRefInviteads.map((invitedRef) => {
    const searchQuery = {
      players: {
        $in: [invitedRef]
      }
    }
    
    return Promise.props({
      invitedRef,
      howManyLeaguesUserPlaying: GuessLeague.find(searchQuery).count()
    })
  })
  
  const guessLeagueQuantityByUser = await Promise.map(getGuessLeagueByUserPromise, (obj) => obj)
  
  request.userRefInviteadsFiltered = guessLeagueQuantityByUser.filter((userGuessLeagueQuantity) => userGuessLeagueQuantity.howManyLeaguesUserPlaying <= MAX_GUESSLEAGUES_FREE_ALLOW)
  request.userRefInviteadsFiltered = request.userRefInviteadsFiltered.reduce((acumulator, userRefInvitedFiltered) => acumulator.concat(userRefInvitedFiltered.invitedRef), [])

  return request
}

const _buildGuessLeagueObj = (request, championship) => ({
  guessLeagueName: request.guessLeagueName,
  captains: [request.userRef],
  inviteads: [],
  players: [request.userRef].concat(request.userRefInviteadsFiltered),
  championship: championship.championship
})

const _buildResponseObj = (request, guessLeagueCreated) => {
  const guessLeagueObjResponse = queryUtils.makeObject(guessLeagueCreated)
  guessLeagueObjResponse.guessLeagueRef = guessLeagueObjResponse._id.toString()
  guessLeagueObjResponse.loggedUserIsCaptain = true
  guessLeagueObjResponse.allInviteadsAdded = request.userRefInviteads.length === request.userRefInviteadsFiltered.length

  return guessLeagueObjResponse
}

module.exports = createGuessLeague