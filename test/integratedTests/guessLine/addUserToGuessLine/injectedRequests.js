const happyPathRequest = {
  method: 'PATCH',
  url: '/guessline/addUserToGuessLine',
  headers: {
    'content-type': 'application/json',
    'token': '591e5c4fa8634f1f9880e8bc'
  },
  payload: {
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
};

const alreadyAdded = {
  method: 'PATCH',
  url: '/guessline/addUserToGuessLine',
  headers: {
    'content-type': 'application/json',
    'token': '59b54e44a7631d433470fee7'
  },
  payload: {
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const guessLineInactive = {
  method: 'PATCH',
  url: '/guessline/addUserToGuessLine',
  headers: {
    'content-type': 'application/json',
    'token': '59b54e44a7631d433470fee7'
  },
  payload: {
    'championshipRef': '59a8ae40bf3e53253bec3d22'
  }
}

module.exports = {
  happyPathRequest,
  alreadyAdded,
  guessLineInactive
}