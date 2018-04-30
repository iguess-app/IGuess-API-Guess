'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/getGuessLeague/getGuessLeagueSchema').response

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()

lab.experiment('Integrated Test ==> getGuessLeague', () => {

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })

  lab.test('getGuessLeague HappyPath', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequest.headers.token)    
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('getGuessLeague happyPath WithOut guessLeague', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathWithOutGuessLeague.headers.token)    
    server.inject(injectedRequests.happyPathWithOutGuessLeague)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('getGuessLeague noGuessLeagues', (done) => {
    stubs.stubSessionRedis(injectedRequests.noGuessLeagues.headers.token)    
    server.inject(injectedRequests.noGuessLeagues)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.noGuessLeagueFound)
        expect(result.errorCode).to.be.equal(errorCode.noGuessLeagueFound)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

})