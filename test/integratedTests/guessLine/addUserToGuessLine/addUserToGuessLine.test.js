'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/addUserToGuessLine/addUserToGuessLineSchemaResponse').schema
const removeUserFromGuessLineList = require('./lib/removeUserFromGuessLineList')

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()

lab.experiment('Integrated Test ==> addUserToGuessLine', () => {

  lab.before((done) => {
    removeUserFromGuessLineList()
      .then(() => done())
  })

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })

  lab.test('addUserToGuessLine - Success', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequest.headers.token)
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        expect(result.userAddedToGuessLine).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  /*This test depends of userRef '591e5c21a8634f1f9880e8b4' to be at least on three guessLine actives */
  /*Skiping while the rule it is not running at production */
  lab.test.skip('addUserToGuessLine Failed - Max number of guessLine allowed explode', (done) => {
    stubs.stubSessionRedis(injectedRequests.maxAllowedExplode.headers.token)
    server.inject(injectedRequests.maxAllowedExplode)
      .then((response) => {
        const result = response.result
        expect(result.statusCode).to.be.equal(statusCode.forbidden)
        expect(result.message).to.be.equal(dictionary.noMoreGuessLineAllowed)
        expect(result.errorCode).to.be.equal(errorCode.noMoreGuessLineAllowed)
        done()
      })
  })

  lab.test('addUserToGuessLine Failed - Already Added', (done) => {
    stubs.stubSessionRedis(injectedRequests.alreadyAdded.headers.token)
    server.inject(injectedRequests.alreadyAdded)
      .then((response) => {
        const result = response.result
        expect(result.statusCode).to.be.equal(statusCode.unauthorized)
        expect(result.message).to.be.equal(dictionary.alreadyAdd)
        expect(result.errorCode).to.be.equal(errorCode.alreadyAdd)
        done()
      })
  })

})