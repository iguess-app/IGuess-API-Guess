const happyPathSchema = {
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
    }
  ]
};

const homeTeamScoreTooLowSchema = {
  championshipRef: '5872a8d2ed1b02314e088291',
  fixture: 2,
  userRef: '591df6c78d1fdc0bb4eba371',
  guesses: [{
    matchRef: '5872a51a4db3fb378bc7ee17',
    homeTeamScore: -8,
    awayTeamScore: 4
  }]
};

module.exports = {
  happyPathSchema,
  homeTeamScoreTooLowSchema
}