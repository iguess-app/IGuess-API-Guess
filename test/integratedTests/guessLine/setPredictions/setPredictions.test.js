'use strict'

const Lab = require('lab')
const Joi = require('joi')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/setPredictions/setPredictionsSchemaResponse')
const statusCode = require('iguess-api-coincidents').Utils.statusUtils

lab.experiment('Integrated Test ==> setPredictions', () => {

  lab.test('setPredictions HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest)
    .then((response) => {
      const result = response.result
      Joi.validate(result, schemaValidate, (err) => {
        expect(err).to.be.equal(null)
        done()
      })
    })
  })

  lab.test('setPredictions matchRefDuplicated', (done) => {
    server.inject(injectedRequests.matchRefDuplicated)
    .then((response) => {
      const result = response.result
      expect(result.statusCode).to.be.equal(statusCode.notAcceptable)
      expect(result.message).to.be.equal('You cannot do predictions to the same match at the same request')
      done()
    })
  })
})