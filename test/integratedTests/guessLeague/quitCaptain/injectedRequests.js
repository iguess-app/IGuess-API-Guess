'use strict'

const happyPathRequest = {
  method: 'DELETE',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '591e5c05a8634f1f9880e8ae',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

 const noGuessLeagueFound = {
  method: 'DELETE',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a355'
  },
  headers: {
    token: '591e5c05a8634f1f9880e8ae',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const noUserFoundAtGuessLeague = {
  method: 'DELETE',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '591e5c05a8634f1f9880e888',
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
  noGuessLeagueFound,
  noUserFoundAtGuessLeague
}