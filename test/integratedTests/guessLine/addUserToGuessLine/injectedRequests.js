const happyPathRequest = {
  method: 'PATCH',
  url: '/guessline/addUserToGuessLine',
  headers: {
    'content-type': 'application/json'
  },
  payload: {
    'championshipRef': '5872a8d2ed1b02314e088291',
    'userRef': '591e5c4fa8634f1f9880e8bc'
  }
};

const alreadyAdded = {
  method: 'PATCH',
  url: '/guessline/addUserToGuessLine',
  headers: {
    'content-type': 'application/json'
  },
  payload: {
    'championshipRef': '5872a8d2ed1b02314e088291',
    'userRef': '59b54e44a7631d433470fee7'
  }
};

module.exports = {
  happyPathRequest,
  alreadyAdded
}