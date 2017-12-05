const happyPathSchema = {
  championshipRef: '5872a8d2ed1b02314e088291',
  guesses: [{
      matchRef: '5872a51a4db3fb378bc7ee17',
      homeTeamScoreGuess: 1,
      awayTeamScoreGuess: 4
    },
    {
      matchRef: '5872a51a4db3fb378bc7ee18',
      homeTeamScoreGuess: 3,
      awayTeamScoreGuess: 0
    }
  ]
};

const homeTeamScoreGuessTooLowSchema = {
  championshipRef: '5872a8d2ed1b02314e088291',
  guesses: [{
    matchRef: '5872a51a4db3fb378bc7ee17',
    homeTeamScoreGuess: -8,
    awayTeamScoreGuess: 4
  }]
};

module.exports = {
  happyPathSchema,
  homeTeamScoreGuessTooLowSchema
}