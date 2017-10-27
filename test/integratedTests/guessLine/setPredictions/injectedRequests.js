const happyPathRequest = {
  method: 'PUT',
  url: '/guessline/setPredictions',
  headers: {
    'language': 'pt-br',
    'content-type': 'application/json'
  },
  payload: {
    championshipRef: '5872a8d2ed1b02314e088291',
    userRef: '591df6c78d1fdc0bb4eba371',
    guesses: [
      {
        matchRef: '59d1475c70dc031ae0973f5b',
        homeTeamScoreGuess: 3,
        awayTeamScoreGuess: 0
      },
      {
        matchRef: '59d1475c70dc031ae0973f5a',
        homeTeamScoreGuess: 0,
        awayTeamScoreGuess: 1
      },
      {
        matchRef: '59d1475c70dc031ae0973f59',
        homeTeamScoreGuess: 4,
        awayTeamScoreGuess: 1
      }
    ]
  }
}

const matchRefDuplicated = {
  method: 'PUT',
  url: '/guessline/setPredictions',
  headers: {
    'language': 'en-us',
    'content-type': 'application/json'
  },
  payload: {
    championshipRef: '5872a8d2ed1b02314e088291',
    userRef: '591df6c78d1fdc0bb4eba371',
    guesses: [{
        matchRef: '5872a51a4db3fb378bc7ee17',
        homeTeamScoreGuess: 1,
        awayTeamScoreGuess: 4
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee18',
        homeTeamScoreGuess: 3,
        awayTeamScoreGuess: 0
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee18',
        homeTeamScoreGuess: 0,
        awayTeamScoreGuess: 1
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee20',
        homeTeamScoreGuess: 4,
        awayTeamScoreGuess: 1
      }
    ]
  }
}

const someMatchOneHourLess = {
  method: 'PUT',
  url: '/guessline/setPredictions',
  headers: {
    'language': 'en-us',
    'content-type': 'application/json'
  },
  payload: {
    championshipRef: '5872a8d2ed1b02314e088291',
    userRef: '591df6c78d1fdc0bb4eba371',
    guesses: [{
        matchRef: '59d1475c70dc031ae0973f53',
        homeTeamScoreGuess: 1,
        awayTeamScoreGuess: 4
      },
      {
        matchRef: '59d1475c70dc031ae0973f58',
        homeTeamScoreGuess: 3,
        awayTeamScoreGuess: 0
      }
    ]
  }
}

const allMatchOneHourLess = {
  method: 'PUT',
  url: '/guessline/setPredictions',
  headers: {
    'language': 'en-us',
    'content-type': 'application/json'
  },
  payload: {
    championshipRef: '5872a8d2ed1b02314e088291',
    userRef: '591df6c78d1fdc0bb4eba371',
    guesses: [{
        matchRef: '59d1475c70dc031ae0973f53',
        homeTeamScoreGuess: 1,
        awayTeamScoreGuess: 4
      },
      {
        matchRef: '59d1475c70dc031ae0973f51',
        homeTeamScoreGuess: 3,
        awayTeamScoreGuess: 0
      }
    ]
  }
}

module.exports = {
  happyPathRequest,
  matchRefDuplicated,
  someMatchOneHourLess,
  allMatchOneHourLess
}