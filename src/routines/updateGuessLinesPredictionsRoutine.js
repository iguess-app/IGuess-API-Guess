/* eslint-disable */

'use strict'

const cronTime = require('./cronTime')

const qs = require('querystring')

const fixture_chumbada = 7
const championship_chumbado = '5872a8d2ed1b02314e088291'

const _buildQueryString = () => 
  qs.stringify({
    fixture: fixture_chumbada,
    championshipRef: championship_chumbado
  })

const _getUsersPredictionsAndSetPontuations = (fixture, models) => {

  _getPredictions(models.predictionsModel)
  .then((predictions) => _calculatePontuations(fixture))
  .then((pontuation) _saveUsersPontuations(models.pontuationsModel))

}

const _getPredictions = (Predictions) => {
  //TODO usar um cursor para interar e não deixar tao custo

  const searchQuery = {
    'championshipFixtureUserKey': {
      '$regex': `${championship_chumbado}_${fixture_chumbada}`,
    }
  }

  return Predictions.find(searchQuery)
}

const _calculatePontuations = () => {

}

 
module.exports = (app) => {
  const pontuationRules = app.coincidents.Config.pontuationRules
  const models = app.src.models
  
  const cronJob = () => new CronJob(cronTime, updatePredictionsPontuation, null, true, 'America/Sao_Paulo')

  const updatePredictionsPontuation = () => {
    const url = `${app.coincidents.Config.apis.holiUrl}/fixture/getFixtureByChampionshipRefAndFixture${_buildQueryString()}`
    const headers = {
      'language': 'en-us',
      'content-type': 'application/json'
    }
    requestManager.get(url, headers)
      .then((fixture) => _getUsersPredictionsAndSetPontuations(fixture, models))
      .catch((err) => log.error(err))
  }

  cronJob()

  module.exports = updatePredictionsPontuation
}


/* module.exports = (app) => {
  const GuessesLines = app.src.models.guessesLinesSchema;
  const Profile = app.src.models.profileSchema;
  const Round = app.src.models.roundSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const runInterpreter = () => {

    //TODO Pass be reference the championship and the fixture 
    const championshipFixture = {
      championship: '5872a8d2ed1b02314e088291',
      fixture: 1
    }

    const guessesLinePromise = _getGuessesLines(championshipFixture);
    const fixtureResultPromise = _getChampionshipFixtureResult(championshipFixture);

    return Promise.all([guessesLinePromise, fixtureResultPromise])
      .spread((guessesLine, fixture) => {

        //_findGuessLineByUser();
        if (!guessesLine.pontuationSetted) {
          guessesLine.users.forEach((userGuessLine) => {
            const guesses = userGuessLine.guesses
            const results = fixture.results;
            let totalPontuation = 0;

            const guessesWithPontuation = guesses.map((gameGuess) => {

              const gameResult = results.find((fixtureResult) =>
                fixtureResult.homeTeam === gameGuess.homeTeam && fixtureResult.awayTeam === gameGuess.awayTeam
              )

              const resultProperties = _checkWinnerAndScore(gameResult);
              const guessProperties = _checkWinnerAndScore(gameGuess);

              const guessPontuation = _getPontuation(guessProperties, resultProperties);
              gameGuess.pontuation = guessPontuation;

              totalPontuation += guessPontuation;

              return gameGuess;
            })
            userGuessLine.guesses = guessesWithPontuation;
            userGuessLine.totalPontuation = totalPontuation;

            _updateUserGuessLine(userGuessLine, championshipFixture);
            _updateUserProfile(userGuessLine, championshipFixture);
          })
        }

        return guessesLine;
      })
  }

  const _updateUserProfile = (userGuessLine, championshipFixture) => {
    const searchQuery = {
      '_id': userGuessLine.userID,
      'guessesLines.championship': championshipFixture.championship
    }
    const updateQuery = {
      '$inc': {
        'guessesLines.$.pontuation': userGuessLine.totalPontuation
      }
    }

    Profile.update(searchQuery, updateQuery)
      .catch((err) => console.log(err))
  }

  const _findGuessLineByUser = (reqBody) => {

    //reqBody = {
    //userID: 'Jao Pe de Arroza',
    //championship: '5872a8d2ed1b02314e088291',
    //fixture: 1
    //} 
    const searchQuery = {
      'users.userID': reqBody.userID,
      'championship': reqBody.championship,
      'fixture': reqBody.fixture
    }

    GuessesLines
      .findOne(searchQuery, {
        'users.$': 1
      })
      .then((guessLine) => {

        if (guessLine) {
          return QueryUtils.makeObject(guessLine);
        }

        return 'trouble';
      })
  }

  const _updateUserGuessLine = (userGuessLine, championshipFixture) => {

    const searchQuery = {
      'users.userID': userGuessLine.userID,
      'championship': championshipFixture.championship,
      'fixture': championshipFixture.fixture
    };
    const updateQuery = {
      '$set': {
        'pontuationSetted': true,
        'users.$.totalPontuation': userGuessLine.totalPontuation,
        'users.$.guesses': userGuessLine.guesses
      }
    }

    GuessesLines.update(searchQuery, updateQuery)
      .catch((err) => console.log(err))
  }

  const _getPontuation = (guessProperties, resultProperties) => {

    let pontuation = 0;

    if (guessProperties.winner === resultProperties.winner) {
      pontuation = HIT_ONLY_THE_WINNER;
      if (guessProperties.homeTeamScore === resultProperties.homeTeamScore &&
        guessProperties.awayTeamScore === resultProperties.awayTeamScore) {
        pontuation = HIT_THE_SCOREBOARD;
      }
    }

    return pontuation;
  }

  const _checkWinnerAndScore = (score) => {

    let winner = null;
    const homeTeamScore = score.finalScore.split('x')[0];
    const awayTeamScore = score.finalScore.split('x')[1];

    if (homeTeamScore > awayTeamScore) {
      winner = HOME_WINNER;
    } else if (homeTeamScore < awayTeamScore) {
      winner = AWAY_WINNER;
    } else {
      winner = NO_WINNER;
    }

    return {
      winner,
      homeTeamScore,
      awayTeamScore
    }
  }

  const _getGuessesLines = (championshipFixture) =>
    new Promise((resolve, reject) =>
      GuessesLines.findOne(championshipFixture)
      .then((guesses) => {

        if (!guesses) {
          reject(guesses)
        }
        resolve(QueryUtils.makeObject(guesses));
      })
    )

  const _getChampionshipFixtureResult = (championshipFixture) =>
    new Promise((resolve, reject) =>
      Round.findOne(championshipFixture)
      .then((results) => {

        if (!results) {
          reject(results)
        }
        resolve(QueryUtils.makeObject(results));
      })
    )

  return {
    runInterpreter
  };
} */