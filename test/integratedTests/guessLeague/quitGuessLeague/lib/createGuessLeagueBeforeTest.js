'use strict'

const server = require('../../../../../app')
const injectedRequests = require('../injectedRequests')

const createGuessLeagueAndGetQuitRequest = () => 

  server.inject(injectedRequests.createGuessLeague)
  .then((response) => {
    injectedRequests.lastPlayerToQuit.payload.guessLeagueRef = response.result._id
    return injectedRequests.lastPlayerToQuit
  })


module.exports = createGuessLeagueAndGetQuitRequest