'use strict'

const happyPathRequest = {
  method: 'DELETE',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '59bddedee7c8a12658c0c08c',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const guessLeagueRefnotFound = {
  method: 'DELETE',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3f9'
  },
  headers: {
    token: '59bddedee7c8a12658c0c08c',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const userRefIsNotAtGuessLeague = {
  method: 'DELETE',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '59bddedee7c8a12658c0c085',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const admCantQuit = {
  method: 'DELETE',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '59b54e44a7631d433470fee7',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const createGuessLeague = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Last player to quit test',
    'championshipRef': '5872a8d2ed1b02314e088291',

    'userRefInviteads': []
  },
  headers: {
    'token': '59b54e44a7631d433470fee7',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const lastPlayerToQuit = {
  method: 'DELETE',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': 'SET DYNAMICALLY'
  },
  headers: {
    'token': '59b54e44a7631d433470fee7',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

module.exports = {
  happyPathRequest,
  guessLeagueRefnotFound,
  userRefIsNotAtGuessLeague,
  admCantQuit,
  createGuessLeague,
  lastPlayerToQuit
}