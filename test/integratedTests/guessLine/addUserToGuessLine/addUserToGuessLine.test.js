'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const stubs = require('./lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/addUserToGuessLine/addUserToGuessLineSchemaResponse').schema
const removeUserFromGuessLineList = require('./lib/removeUserFromGuessLineList')

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
    stubs.restoreStub()
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

  lab.test('addUserToGuessLine Failed - Already Added', (done) => {
    stubs.stubSessionRedis(injectedRequests.alreadyAdded.headers.token)
    server.inject(injectedRequests.alreadyAdded)
      .then((response) => {
        const result = response.result
        expect(result.statusCode).to.be.equal(statusCode.unauthorized)
        expect(result.message).to.be.equal(dictionary.alreadyAdd)
        done()
      })
  })

  lab.test('addUserToGuessLine Failed - GuessLine Inactive', (done) => {
    stubs.stubSessionRedis(injectedRequests.guessLineInactive.headers.token)
    server.inject(injectedRequests.guessLineInactive)
      .then((response) => {
        const result = response.result
        expect(result.statusCode).to.be.equal(statusCode.unauthorized)
        expect(result.message).to.be.equal(dictionary.guessLineInactive)
        done()
      })
  })
})