'use strict'

const Joi = require('joi')
const Lab = require('lab')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/availability/availabilitySchema').response.schema

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> userAtGuessLine', () => {
  
  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })

  lab.test('userAtGuessLine True', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequestUserAtGuessLine.headers.token)
    server.inject(injectedRequests.happyPathRequestUserAtGuessLine)
      .then((response) => {
        const result = response.result
        expect(result.userRefAtGuessLineList).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('userAtGuessLine False', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathUserIsntAtGuessLine.headers.token)
    server.inject(injectedRequests.happyPathUserIsntAtGuessLine)
      .then((response) => {
        const result = response.result
        expect(result.userRefAtGuessLineList).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

})