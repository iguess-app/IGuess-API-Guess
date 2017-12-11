'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRefInviteads': ['591e5c3fa8634f1f9880e8ba'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  },
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

const notAtGuessLine = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRefInviteads': ['591e5c36a8634f1f9880e8b8'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  },
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

const alreadyAdd = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRefInviteads': ['591e5bbba8634f1f9880e8aa'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  },
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

const notCaptainTryToAdd = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRefInviteads': ['591e5c63a8634f1f9880e8c0'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  },
  headers: {
    token: '591e5bbba8634f1f9880e8aa',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const alreadyAtInviteadList = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRefInviteads': ['591e5c98a8634f1f9880e8c4'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  },
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

const duplicatedInviteadsList = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRefInviteads': ['591e5c3fa8634f1f9880e8ba', '591e5c3fa8634f1f9880e8ba'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  },
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

module.exports = {
  happyPathRequest,
  notAtGuessLine,
  alreadyAdd,
  notCaptainTryToAdd,
  duplicatedInviteadsList,
  alreadyAtInviteadList
}