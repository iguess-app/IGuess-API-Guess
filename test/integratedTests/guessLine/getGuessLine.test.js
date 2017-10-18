'use strict'

const Joi = require('joi')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const injectedRequests = require('./injectedRequests')
const server = require('../../../app')
const schemaValidate = require('../../../src/routes/schemas/guessLine/getGuessLine/getGuessLineSchema').response

lab.experiment('Integrated Test ==> getGuessLine', () => {

  lab.test('getGuessLine HappyPath', (done) => {
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