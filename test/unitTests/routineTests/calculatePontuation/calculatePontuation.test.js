const Lab = require('lab')
const pontuationRules = require('iguess-api-coincidents').Config.pontuationRules

const lab = exports.lab = Lab.script()
const expect = Lab.expect

const guessAndGamesObj = require('./guessAndGamesObj')
const calculatePontuation = require('../../../../src/routines/updatePontuationsRoutine/functions/calculatePontuationsFunction')

lab.experiment('Routine Unit Test ==> calculate Pontuation', () => {

  lab.test('calculate Pontuation home team winner (Hit the ScoreBoard)', (done) => {
    const guessExample = guessAndGamesObj.homeTeamWinHitScoreboard
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_THE_SCOREBOARD)
    done()
  })
  
  lab.test('calculate Pontuation away team winner (Hit the ScoreBoard)', (done) => {
    const guessExample = guessAndGamesObj.awayTeamWinHitScoreboard
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_THE_SCOREBOARD)
    done()
  })
  
  lab.test('calculate Pontuation tie (Hit the ScoreBoard)', (done) => {
    const guessExample = guessAndGamesObj.tieWinHitScoreboard
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_THE_SCOREBOARD)
    done()
  })
  
  lab.test('calculate Pontuation home team winner (Hit only the Winner)', (done) => {
    const guessExample = guessAndGamesObj.homeTeamWinHitWinner
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_ONLY_THE_WINNER)
    done()
  })
  
  lab.test('calculate Pontuation away team winner (Hit only the Winner)', (done) => {
    const guessExample = guessAndGamesObj.awayTeamWinHitWinner
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_ONLY_THE_WINNER)
    done()
  })

  lab.test('calculate Pontuation tie (Hit only the Winner)', (done) => {
    const guessExample = guessAndGamesObj.tieWinHitWinner
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_ONLY_THE_WINNER)
    done()
  })

  lab.test('calculate Pontuation obj without game result yet', (done) => {
    const guessExample = guessAndGamesObj.gameObjWithOutResult
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_NOTHING)
    done()
  })

  lab.test('calculate Pontuation away team winner (Hit nothing)', (done) => {
    const guessExample = guessAndGamesObj.hitNothingAwayWin
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_NOTHING)
    done()
  })

  lab.test('calculate Pontuation home team winner (Hit nothing)', (done) => {
    const guessExample = guessAndGamesObj.hitNothingHomeWin
    expect(
      calculatePontuation(guessExample.game, guessExample.guess)
    ).to.be.equal(pontuationRules.HIT_NOTHING)
    done()
  })
})

/*eslint no-magic-numbers: 0*/