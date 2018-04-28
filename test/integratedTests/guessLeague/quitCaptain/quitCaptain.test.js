'use strict'

const Lab = require('lab')
const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/captain/quitCaptainSchema').response
const GuessLeague = require('../../../../src/models/guessDB/guessesLeaguesModel')

const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()
const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> quitCaptain', () => {

  lab.before((done) => {
    const searchQuery = { 
      _id: '59c05e253feecf1e2898a3fb',
      captains: {
        $nin: ['591e5c05a8634f1f9880e8ae']
      }
    }
    const updateQuery = { $push: { captains: '591e5c05a8634f1f9880e8ae' } }
    GuessLeague.update(searchQuery, updateQuery)
      .then(() => done())
  })

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })

  lab.test('quitCaptain HappyPath', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequest.headers.token)    
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

  lab.test('quitCaptain noGuessLeagueFound', (done) => {
    stubs.stubSessionRedis(injectedRequests.noGuessLeagueFound.headers.token)    
    server.inject(injectedRequests.noGuessLeagueFound)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.noGuessLeagueFound)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

  lab.test('quitCaptain noUserFoundAtGuessLeague', (done) => {
    stubs.stubSessionRedis(injectedRequests.noUserFoundAtGuessLeague.headers.token)    
    server.inject(injectedRequests.noUserFoundAtGuessLeague)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.noGuessLeagueFound)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

})