'use strict'

const Joi = require('joi')
const Lab = require('lab')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/listLeaguesWithActiveLines/listLeaguesWithActiveLinesSchema').response

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> listLeaguesWithActiveLines', () => {

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })
  
  lab.test('listLeaguesWithActiveLines HappyPath', (done) => {
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

})

/*eslint no-magic-numbers: 0*/