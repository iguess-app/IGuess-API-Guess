'use strict'

const Lab = require('lab')
const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/setPredictions/setPredictionsSchemaResponse')
const updateMatchInitTimeToPredictionGoWell = require('./lib/updateMatchInitTimeToPredictionGoWell')

const { errorCode } = coincidents.Utils
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()
const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> setPredictions', () => {

  lab.before((done) => {
    updateMatchInitTimeToPredictionGoWell()
      .then(() => done())
  })

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })

  lab.test('setPredictions HappyPath', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequest.headers.token)
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        expect(result.alertMessage).to.be.equal('')
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('setPredictions matchRefDuplicated', (done) => {
    stubs.stubSessionRedis(injectedRequests.matchRefDuplicated.headers.token)
    server.inject(injectedRequests.matchRefDuplicated)
      .then((response) => {
        const result = response.result
        expect(result.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.matchDuplicated)
        expect(result.errorCode).to.be.equal(errorCode.matchDuplicated)
        done()
      })
  })

  lab.test('setPredictions someMatchOneHourLess', (done) => {
    stubs.stubSessionRedis(injectedRequests.someMatchOneHourLess.headers.token)
    server.inject(injectedRequests.someMatchOneHourLess)
      .then((response) => {
        const result = response.result
        expect(result.alertMessage).to.be.equal(dictionary.someMatchesoneHourOff)
        expect(response.statusCode).to.be.equal(statusCode.ok)        
        done()
      })
  })

  lab.test('setPredictions allMatchOneHourLess', (done) => {
    stubs.stubSessionRedis(injectedRequests.allMatchOneHourLess.headers.token)
    server.inject(injectedRequests.allMatchOneHourLess)
      .then((response) => {
        const result = response.result
        expect(result.statusCode).to.be.equal(statusCode.unauthorized)
        expect(result.message).to.be.equal(dictionary.allMatchesoneHourOff)
        expect(result.errorCode).to.be.equal(errorCode.allMatchesoneHourOff)
        done()
      })
  })
})