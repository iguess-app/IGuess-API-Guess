'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/editGuessLeague/editGuessLeagueSchema').response
const generateString = require('./lib/generateString')

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()

lab.experiment('Integrated Test ==> editGuessLeague', () => {

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })


  /**
   * This test need to guessLeague id=59c0730fe102884c5cb6ba79 exist at DB
   */
  lab.test('editGuessLeague HappyPath', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequest.headers.token)
    const newNameGenerated = generateString()
    injectedRequests.happyPathRequest.payload.newName = newNameGenerated
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          expect(result.guessLeagueName).to.be.equal(newNameGenerated)
          done()
        })
      })
  })

  lab.test('editGuessLeague not found', (done) => {
    stubs.stubSessionRedis(injectedRequests.notFound.headers.token)    
    server.inject(injectedRequests.notFound)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.guessLeagueNotFound)
        expect(result.errorCode).to.be.equal(errorCode.guessLeagueNotFound)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

})