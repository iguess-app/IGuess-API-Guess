const happyPathRequest = {
  method: 'GET',
  url: '/guessline/listGuessesLines?userRef=59bddea6e7c8a12658c0c08a'
}

const happyPathWithPontuation = {
  method: 'GET',
  url: '/guessline/listGuessesLines?userRef=59bddea6e7c8a12658c0c08a&showPontuation=true'
}

const happyPathOnlyActive = {
  method: 'GET',
  url: '/guessline/listGuessesLines?userRef=59bddea6e7c8a12658c0c0bb&onlyActive=true'
}

const noGuessLinesFound = {
  method: 'GET',
  url: '/guessline/listGuessesLines?userRef=59bddea6e7c8a12658c0c033'
}

module.exports = {
  happyPathRequest,
  happyPathWithPontuation,
  happyPathOnlyActive,
  noGuessLinesFound
}