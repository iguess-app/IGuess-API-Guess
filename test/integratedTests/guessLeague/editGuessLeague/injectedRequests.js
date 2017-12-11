'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/editGuessLeague',
  headers: {
    token: '59b54e44a7631d433470fee7',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  },
  payload: {
    'guessLeagueRef': '59c0730fe102884c5cb6ba79',
    'newName': 'SET DYNAMICALLY'
  }
}

const notFound = {
  method: 'PATCH',
  url: '/guessleague/editGuessLeague',
  headers: {
    token: '59b54e44a7631d433470fee9',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  },
  payload: {
    'guessLeagueRef': '5a2756430a3d182004c7dcce',
    'newName': 'whatever'
  }
}

module.exports = {
  happyPathRequest,
  notFound
}