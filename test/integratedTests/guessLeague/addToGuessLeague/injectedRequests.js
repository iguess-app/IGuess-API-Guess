'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/addToGuessLeague',
  payload: {
    'guessLeagueRef': '5b19f4a797ff10dbf4206bbf',
    'championshipRef': '59a8ae40bf3e53253bec3d23',
    'userRefsToAdd': ['5aad4b885680043904b40415']
  },
  headers: {
    'token': '5b10b7a133ca7a5c3c89a0df',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const notAtGuessline = {
  method: 'PATCH',
  url: '/guessleague/addToGuessLeague',
  payload: {
    'guessLeagueRef': '5b18a3ed0c1d4924a4062b92',
    'championshipRef': '59a8ae40bf3e53253bec3d23',
    'userRefsToAdd': ['NotAtGuessLinePlayer0000']
  },
  headers: {
    'token': '5b10b7a133ca7a5c3c89a0df',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const duplicatedPlayers = {
  method: 'PATCH',
  url: '/guessleague/addToGuessLeague',
  payload: {
    'guessLeagueRef': '5b18a3ed0c1d4924a4062b92',
    'championshipRef': '59a8ae40bf3e53253bec3d23',
    'userRefsToAdd': ['NotAtGuessLinePlayer0001', 'NotAtGuessLinePlayer0001']
  },
  headers: {
    'token': '5b10b7a133ca7a5c3c89a0df',
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
  notAtGuessline,
  duplicatedPlayers
}