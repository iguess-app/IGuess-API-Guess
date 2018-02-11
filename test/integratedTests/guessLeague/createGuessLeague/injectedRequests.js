'use strict'

const happyPathRequest = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Integrated Test GuessLeague',
    'championshipRef': '5872a8d2ed1b02314e088291',

    'userRefInviteads': []
  },
  headers: {
    'token': '591df6c78d1fdc0bb4eba371',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const maxGuessLeagueExplode = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Try to add a max guessLeague',
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

const admInvitingHimself = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Integrated Test GuessLeague',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'userRefInviteads': [
      '59b54e44a7631d433470fee7'
    ]
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

const duplicatedInviteads = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Integrated Test GuessLeague',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'userRefInviteads': [
      '59b54e44a7631d433470fee8',
      '59b54e44a7631d433470fee9',
      '59b54e44a7631d433470fee9'
    ]
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

const invitatorUserNotAtGussLine = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Integrated Test GuessLeague',
    'championshipRef': '5872a8d2ed1b02314e088295',
    'userRefInviteads': [
      '59b54e44a7631d433470fee8'
    ]
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
  maxGuessLeagueExplode,
  admInvitingHimself,
  duplicatedInviteads,
  invitatorUserNotAtGussLine
}