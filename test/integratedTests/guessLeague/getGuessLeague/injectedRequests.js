'use strict'

const happyPathRequest = {
  method: 'GET',
  url: '/guessleague/getGuessLeague?userRef=59b54e44a7631d433470fee7&guessLeagueRef=59c0730fe102884c5cb6ba79'
}

const happyPathWithOutGuessLeague = {
  method: 'GET',
  url: '/guessleague/getGuessLeague?userRef=59b54e44a7631d433470fee7'
}

const noGuessLeagues = {
  method: 'GET',
  url: '/guessleague/getGuessLeague?userRef=59b54e44a7631d433470fee9'
}

module.exports = {
  happyPathRequest,
  happyPathWithOutGuessLeague,
  noGuessLeagues
}