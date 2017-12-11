'use strict'

const happyPathResponseYesRequest = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '591e5ccca8634f1f9880e8ca',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const happyPathResponseNotRequest = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': false
  },
  headers: {
    token: '591e5cdaa8634f1f9880e8cc',
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
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '591e5c36a8634f1f9880e8b8',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const userNotAtInviteadsList = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '591e5c21a8634f1f9880e8b4',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const userAlreadyAtPlayersList = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
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

const guessLeagueNotFound = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e28984444',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '591e5ccca8634f1f9880e8ca',
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
  happyPathResponseYesRequest,
  happyPathResponseNotRequest,
  notAtGuessLine,
  userNotAtInviteadsList,
  userAlreadyAtPlayersList,
  guessLeagueNotFound
}