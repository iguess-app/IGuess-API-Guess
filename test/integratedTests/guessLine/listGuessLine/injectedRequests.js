const happyPathRequest = {
  method: 'GET',
  url: '/guessline/listGuessesLines',
  headers: {
    token: '59bddea6e7c8a12658c0c08a'
  }
}

const happyPathWithPontuation = {
  method: 'GET',
  url: '/guessline/listGuessesLines?&showPontuation=true',
  headers: {
    token: '59bddea6e7c8a12658c0c08a'
  }
}

const happyPathOnlyActive = {
  method: 'GET',
  url: '/guessline/listGuessesLines?onlyActive=true',
  headers: {
    token: '59bddea6e7c8a12658c0c0bb'
  }
}

const noGuessLinesFound = {
  method: 'GET',
  url: '/guessline/listGuessesLines',
  headers: {
    token: '59bddea6e7c8a12658c0c033'
  }
}

module.exports = {
  happyPathRequest,
  happyPathWithPontuation,
  happyPathOnlyActive,
  noGuessLinesFound
}