const happyPathRequest = {
  method: 'GET',
  url: '/guessline/getGuessLine?championshipRef=5872a8d2ed1b02314e088291&userRef=59bddea6e7c8a12658c0c08a',
  headers: {
    'language': 'pt-br'
  }
}

const guesslineNotFoundWrongChampionship = {
  method: 'GET',
  url: '/guessline/getGuessLine?championshipRef=5872a8d00000000000000001&userRef=59bddea6e7c8a12658c0c08a'
}

const guesslineNotFoundWrongUser = {
  method: 'GET',
  url: '/guessline/getGuessLine?championshipRef=5872a8d2ed1b02314e088291&userRef=59bddea6e7c8a12658c0c0bb'
}

module.exports = {
  happyPathRequest,
  guesslineNotFoundWrongChampionship,
  guesslineNotFoundWrongUser
}