'use strict'

const happyPathRequest = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Integrated Test GuessLeague',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': []
  }
}

const admInvitingHimself = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Integrated Test GuessLeague',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': [
      '59b54e44a7631d433470fee7'
    ]
  }
}

const duplicatedInviteads = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Integrated Test GuessLeague',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': [
      '59b54e44a7631d433470fee8',
      '59b54e44a7631d433470fee9',
      '59b54e44a7631d433470fee9'
    ]
  }
}

const invitatorUserNotAtGussLine = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Integrated Test GuessLeague',
    'championshipRef': '5872a8d2ed1b02314e088295',
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': [
      '59b54e44a7631d433470fee8'
    ]
  }
}

module.exports = {
  happyPathRequest,
  admInvitingHimself,
  duplicatedInviteads,
  invitatorUserNotAtGussLine
}