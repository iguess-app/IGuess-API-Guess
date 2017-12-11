'use strict'

const happyPathRequest = {
  method: 'GET',
  url: '/guessleague/getGuessLeague?guessLeagueRef=59c0730fe102884c5cb6ba79',
  headers: {
    token: '59b54e44a7631d433470fee7',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const happyPathWithOutGuessLeague = {
  method: 'GET',
  url: '/guessleague/getGuessLeague',
  headers: {
    token: '59b54e44a7631d433470fee7',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const noGuessLeagues = {
  method: 'GET',
  url: '/guessleague/getGuessLeague',
  headers: {
    token: '59b54e44a7631d433470fee9',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

module.exports = {
  happyPathRequest,
  happyPathWithOutGuessLeague,
  noGuessLeagues
}