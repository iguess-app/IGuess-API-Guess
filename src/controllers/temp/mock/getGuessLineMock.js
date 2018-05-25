//TODO: REMOVER O MOCK DEPOIS DOS TESTES DO FRONT
const mock = {
  'championship': {
    'championshipRef': '5b075699ecf2739721b18acd',
    'league': '5b075646ecf2739721b18ac1',
    'season': '2020',
    'championship': 'Campeonato Mockado',
    'translateFlag': 'brazilian'
  },
  'guessLinePontuation': 156,
  'matchDayPontuation': 20,
  'matchDayIsoDate': '2020-03-25T00:00:00Z',
  'matchDayHumanified': {
    'mainInfoDate': '25/Março',
    'subInfoDate': 'Quarta-feira'
  },
  'games': [{
      'matchRef': 'MOCK_MATCH_1_ALLOW_PREDICT',
      'homeTeam': {
        'league': '5a274927fcef4b5122ef7a83',
        'fullName': 'Manchester City Football Club',
        'shortName': 'Manchester City',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_normal/manchester_city.jpg',
          'small': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_small/manchester_city.jpg',
          'mini': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_mini/manchester_city.jpg'
        },
        'apiFootballName': 'Manchester City',
        'teamRef': '5a27522dfcef4b5122ef7ab2'
      },
      'awayTeam': {
        'league': '5a274927fcef4b5122ef7a83',
        'fullName': 'Manchester United Football Club',
        'shortName': 'Manchester United',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_normal/manchester_united.png',
          'small': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_small/manchester_united.png',
          'mini': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_mini/manchester_united.png'
        },
        'apiFootballName': 'Manchester United',
        'teamRef': '5a274e9dfcef4b5122ef7a8b'
      },
      'ended': false,
      'started': false,
      'initTimeIsoDate': '2020-03-25T15:30:00Z',
      'initTimeHumanified': '15H 30M',
      'allowToPredict': true
    },
    {
      'matchRef': 'MOCK_MATCH_2_ALLOW_PREDICT_WITH_GUESS',
      'homeTeam': {
        'league': '58726176ed1b02314e08828b',
        'fullName': 'Athletic Bilbao',
        'shortName': 'Athletic Bilbao',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_normal/athletic_bilbao.png',
          'small': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_small/athletic_bilbao.png',
          'mini': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_mini/athletic_bilbao.png'
        },
        'apiFootballName': 'Athletic Bilbao',
        'teamRef': '5a2ead457e3d96de1bd9138a'
      },
      'awayTeam': {
        'league': '58726176ed1b02314e08828b',
        'fullName': 'Reial Club Deportiu Espanyol de Barcelona',
        'shortName': 'Espanyol',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_normal/espanyol.png',
          'small': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_small/espanyol.png',
          'mini': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_mini/espanyol.png'
        },
        'apiFootballName': 'Espanyol',
        'teamRef': '5a2ead457e3d96de1bd91393'
      },
      'ended': false,
      'started': false,
      'initTimeIsoDate': '2020-03-25T15:30:00Z',
      'initTimeHumanified': '15H 30M',
      'allowToPredict': true,
      'awayTeamScoreGuess': 1,
      'homeTeamScoreGuess': 1,
      'matchPontuation': 0
    },
    {
      'matchRef': 'MOCK_MATCH_2_LIVE_WITH_GUESS',
      'homeTeamScore': 1,
      'awayTeamScore': 2,
      'homeTeam': {
        'league': '58726176ed1b02314e08828b',
        'fullName': 'Club Atlético de Madrid',
        'shortName': 'Atletico Madrid',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_normal/atletico_madrid.png',
          'small': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_small/atletico_madrid.png',
          'mini': 'https://storage.googleapis.com/iguess-static-files/uefa/la_liga_mini/atletico_madrid.png'
        },
        'apiFootballName': 'Atletico Madrid',
        'teamRef': '5a27522dfcef4b5122ef7aa9'
      },
      'awayTeam': {
        'league': '5a274927fcef4b5122ef7a83',
        'fullName': 'Tottenham Hotspur Football Club',
        'shortName': 'Tottenham',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_normal/tottenham.png',
          'small': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_small/tottenham.png',
          'mini': 'https://storage.googleapis.com/iguess-static-files/uefa/premier_league_mini/tottenham.png'
        },
        'apiFootballName': 'Tottenham Hotspur',
        'teamRef': '5a27522dfcef4b5122ef7ab9'
      },
      'ended': false,
      'started': true,
      'minutes': '42',
      'percentageCompleted': 48.55,
      'initTimeIsoDate': '2020-03-25T15:30:00Z',
      'initTimeHumanified': '15H 30M',
      'allowToPredict': false,
      'awayTeamScoreGuess': 4,
      'homeTeamScoreGuess': 1,
      'matchPontuation': 8
    },
    {
      'matchRef': 'MOCK_MATCH_ENDED_WITH_GUESS',
      'homeTeamScore': 1,
      'awayTeamScore': 0,
      'homeTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Associação Chapecoense de Futebol',
        'shortName': 'Chapecoense',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_normal/chapecoense.png',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_small/chapecoense.png',
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_mini/chapecoense.png'
        },
        'apiFootballName': 'Chapecoense AF',
        'teamRef': '5872a51a4db3fb378bc7ee19'
      },
      'awayTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Clube de Regatas do Flamengo',
        'shortName': 'Flamengo',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_normal/flamengo.png',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_small/flamengo.png',
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_mini/flamengo.png'
        },
        'apiFootballName': 'Flamengo',
        'teamRef': '5872a51a4db3fb378bc7ee1d'
      },
      'ended': true,
      'started': true,
      'minutes': '90',
      'percentageCompleted': 100,
      'initTimeIsoDate': '2020-03-25T19:00:00Z',
      'initTimeHumanified': '19H 00M',
      'allowToPredict': true,
      'awayTeamScoreGuess': 0,
      'homeTeamScoreGuess': 1,
      'matchPontuation': 10
    },
    {
      'matchRef': 'MOCK_MATCH_ENDED_WITH_NO_GUESS',
      'homeTeamScore': 1,
      'awayTeamScore': 4,
      'homeTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'São Paulo Futebol Clube',
        'shortName': 'São Paulo',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_normal/sao_paulo.png',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_small/sao_paulo.png',
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_mini/sao_paulo.png'
        },
        'apiFootballName': 'Sao Paulo',
        'teamRef': '587241f6ed1b02314e088288'
      },
      'awayTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Sport Club Corinthians Paulista',
        'shortName': 'Corinthians',
        'logo': {
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_normal/',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_small/',
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol/brazil_mini/'
        },
        'apiFootballName': 'Corinthians',
        'teamRef': '5872a51a4db3fb378bc7ee1a'
      },
      'ended': true,
      'started': true,
      'minutes': '90',
      'percentageCompleted': 100,
      'initTimeIsoDate': '2020-03-25T19:00:00Z',
      'initTimeHumanified': '19H 00M',
      'allowToPredict': true,
      'matchPontuation': 0
    }
  ]
}

module.exports = mock