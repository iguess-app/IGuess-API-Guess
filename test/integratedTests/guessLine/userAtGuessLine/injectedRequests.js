const happyPathRequestUserAtGuessLine = {
  method: 'GET',
  url: '/guessline/userAtGuessLine?userRef=59bddea6e7c8a12658c0c08a&championshipRef=5872a8d2ed1b02314e088291'
}

const happyPathUserIsntAtGuessLine = {
  method: 'GET',
  url: '/guessline/userAtGuessLine?userRef=59bddea6e7c8a12658c0c044&championshipRef=5872a8d2ed1b02314e088291'
}

module.exports = {
  happyPathRequestUserAtGuessLine,
  happyPathUserIsntAtGuessLine
}