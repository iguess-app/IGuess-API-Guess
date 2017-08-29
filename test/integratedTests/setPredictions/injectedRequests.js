const happyPathRequest = {
  method: 'PUT',
  url: '/guessline/setPredictions',
  headers: {
    'language': 'pt-br',
    'content-type': 'application/json'
  },
  payload: {
    championshipRef: '5872a8d2ed1b02314e088291',
    fixture: 2,
    userRef: '591df6c78d1fdc0bb4eba371',
    guesses: [{
        matchRef: '5872a51a4db3fb378bc7ee17',
        homeTeamScore: 1,
        awayTeamScore: 4
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee18',
        homeTeamScore: 3,
        awayTeamScore: 0
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee19',
        homeTeamScore: 0,
        awayTeamScore: 1
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee20',
        homeTeamScore: 4,
        awayTeamScore: 1
      }
    ]
  }
};

const matchRefDuplicated = {
  method: 'PUT',
  url: '/guessline/setPredictions',
  headers: {
    'language': 'pt-br',
    'content-type': 'application/json'
  },
  payload: {
    championshipRef: '5872a8d2ed1b02314e088291',
    fixture: 2,
    userRef: '591df6c78d1fdc0bb4eba371',
    guesses: [{
        matchRef: '5872a51a4db3fb378bc7ee17',
        homeTeamScore: 1,
        awayTeamScore: 4
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee18',
        homeTeamScore: 3,
        awayTeamScore: 0
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee18',
        homeTeamScore: 0,
        awayTeamScore: 1
      },
      {
        matchRef: '5872a51a4db3fb378bc7ee20',
        homeTeamScore: 4,
        awayTeamScore: 1
      }
    ]
  }
};

module.exports = {
  happyPathRequest,
  matchRefDuplicated
}