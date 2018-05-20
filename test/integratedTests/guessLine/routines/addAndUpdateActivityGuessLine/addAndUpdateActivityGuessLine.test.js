'use strict'

const Lab = require('lab')

const lab = exports.lab = Lab.script()
const expect = Lab.expect

const GuessLine = require('../../../../../src/models/guessDB/guessesLinesModel')
const fireRoutine = require('../../../../../src/routines/addNewAndUpdateGuessLinesActivityRoutine/addAndUpdateActivityGuessLinesRoutine').fireRoutine

lab.experiment('Integrated Test ==> Routine - Add New GuessLine and Update Activity', () => {

  lab.before((done) => {
    const searchQueryActive = {
      'championship.championshipRef': '59b2fc5d2c508c010bfb2b45',
      'championship.championship': 'Copa Nordeste'
    }
    const updateQuery = {
      'guessLineActive': true
    }

    const searchQueryToRemove = {
      'championship.championshipRef': '59a8ae40bf3e53253bec3d22',
      'championship.championship': 'Copa do Brasil'
    }

    GuessLine.findOneAndUpdate(searchQueryActive, updateQuery)
      .then(() => GuessLine.remove(searchQueryToRemove))
      .then(() => done())
  })
  
  lab.test('Check New GuessLine and Activity change', (done) => {
    fireRoutine()
      .then((guessesLine) => {
        const someGuessLine = guessesLine[0]
        guessesLine.forEach((guessLine) => {
          if (guessLine.championship.championship === 'Copa do Brasil') {
            expect(guessLine).to.exists()
          }
          if (guessLine.championship.championship === 'Copa Nordeste') {
            expect(guessLine.guessLineActive).to.be.equals(false)
          }
        })
        expect(someGuessLine.championship.championshipRef).to.exists()
        expect(someGuessLine.championship.league).to.exists()
        expect(someGuessLine.championship.season).to.exists()
        expect(someGuessLine.championship.championship).to.exists()
        expect(someGuessLine.championship.translateFlag).to.exists()
        expect(someGuessLine.guessLineActive).to.be.a.boolean()
        expect(someGuessLine.usersAddedAtGuessLine).to.be.a.array()
        done()
      })
  })

})

/*eslint no-magic-numbers: 0*/