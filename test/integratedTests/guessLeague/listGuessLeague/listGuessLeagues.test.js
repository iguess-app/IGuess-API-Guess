'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/listGuessLeague/listGuessLeagueSchema').response

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()

lab.experiment('Integrated Test ==> listGuessLeague', () => {

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })
  
  lab.test('listGuessLeague HappyPath', (done) => {
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

  lab.test('listGuessLeague noGuessLeagueFound', (done) => {
    stubs.stubSessionRedis(injectedRequests.noGuessLeagueFound.headers.token)    
    server.inject(injectedRequests.noGuessLeagueFound)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        expect(result.message).to.be.equal(dictionary.noGuessLeagueFound)
        expect(result.errorCode).to.be.equal(errorCode.noGuessLeagueFound)
        done()
      })
  })

})