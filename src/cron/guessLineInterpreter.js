'use strict';

const Promise = require('bluebird');

const HIT_ONLY_THE_WINNER = 2;
const HIT_THE_SCOREBOARD = 5;
const HOME_WINNER = 'HOME';
const AWAY_WINNER = 'AWAY';
const NO_WINNER = 'DRAW';

module.exports = (app) => {
  const GuessesLines = app.coincidents.Schemas.guessesLinesSchema;
  const Profile = app.coincidents.Schemas.profileSchema;
  const Round = app.coincidents.Schemas.roundSchema;
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
}