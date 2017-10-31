'use strict'

const Lab = require('lab')
const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/quitGuessLeague/quitGuessLeagueSchema').response
const GuessLeague = require('../../../../src/models/guessDB/guessesLeaguesModel')

const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()
const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> quitGuessLeague', () => {

  lab.before((done) => {
    GuessLeague.findById('59c05e253feecf1e2898a3fb')
      .then((guessLeagueFound) => {
        guessLeagueFound.players.push('59bddedee7c8a12658c0c08c')
        return guessLeagueFound.save()
      })
      .then(() => done())
  })

  lab.test('quitGuessLeague HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.ok)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('quitGuessLeague adm Cant Quit', (done) => {
    server.inject(injectedRequests.admCantQuit)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.admNotQuitGle)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

  lab.test('quitGuessLeague Twice Invited (Duplicated Inviteads)', (done) => {
    server.inject(injectedRequests.guessLeagueRefnotFound)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.anyGuessLeagueFound)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

  lab.test('quitGuessLeague Invitator User not at GuessLine', (done) => {
    server.inject(injectedRequests.userRefIsNotAtGuessLeague)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.anyGuessLeagueFound)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })
  
})