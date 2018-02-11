'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')
const GuessLeague = require('../../models/guessDB/guessesLeaguesModel')

const statusUtils = coincidents.Utils.statusUtils
const queryUtils = coincidents.Utils.queryUtils
const MAX_GUESSLEAGUES_FREE_ALLOW = coincidents.Config.guess.maxGuessLeagueFreeAllow

const QUANTITY_TO_REMOVE = 1
const NOT_AT_ARRAY = -1

const inviteToGuessLeagueRepository = (request, dictionary) => {

  const searchQuery = {
    _id: queryUtils.makeObjectId(request.guessLeagueRef),
    players: {
      $nin: [request.userRef]
    },
    inviteads: {
      $in: [request.userRef]
    }
  }

  return _countHowManyGuessLeaguesTheUserIsPlayer(request)
    .then((userGuessLeagueArePlayerNumber) => _verifyIsIfAllowCreateAnotherGuessLeague(userGuessLeagueArePlayerNumber, request, dictionary))
    .then(() => GuessLeague.findOne(searchQuery))
    .then((guessLeagueFound) => {
      _checkErrors(guessLeagueFound, request, dictionary)
      _deleteUserFromInviteadsArray(guessLeagueFound, request.userRef)
      if (request.response) {
        guessLeagueFound.players.push(request.userRef)
      }

      return guessLeagueFound.save()
    })
    .then((guessLeagueUpdated) => ({
      invitationResponded: true,
      userAddedToGuessLeague: Boolean(guessLeagueUpdated.players.find((playerRef) => playerRef === request.userRef))
    }))
}

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

const _checkErrors = (guessLeagueFound, request, dictionary) => {
  if (!guessLeagueFound) {
    throw Boom.create(statusUtils.forbidden, dictionary.someWrongAtInvite, request)
  }
}

const _userNotPremium = () => {
  //TODO: Get dynamically if the user is premium or not
  const TEMP_RESPONSE_UNTIL_DOES_NOT_HAVE_THE_DATE = true
  return TEMP_RESPONSE_UNTIL_DOES_NOT_HAVE_THE_DATE
}

const _deleteUserFromInviteadsArray = (guessLeagueFound, userRef) => {
  const playerIndex = guessLeagueFound.inviteads.findIndex((invited) => invited === userRef)
  if (_checkIfIsAtArray(playerIndex)) {
    guessLeagueFound.inviteads.splice(playerIndex, QUANTITY_TO_REMOVE)
  }
  return guessLeagueFound
}

const _checkIfIsAtArray = (index) => index !== NOT_AT_ARRAY

module.exports = inviteToGuessLeagueRepository