'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/getGuessLine/listGuessesLinesSchema').response

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils


lab.experiment('Integrated Test ==> listGuessLine', () => {
  
  lab.test('listGuessLine HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('listGuessLine with Pontuation', (done) => {
    server.inject(injectedRequests.happyPathWithPontuation)
      .then((response) => {
        const result = response.result
        expect(result[0].pontuation).to.exists()
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('listGuessLine with only Actives', (done) => {
    server.inject(injectedRequests.happyPathOnlyActive)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('listGuessLine with no guessLinesFound', (done) => {
    server.inject(injectedRequests.noGuessLinesFound)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.ok)
        expect(result.length).to.be.equal(0)
        done()
      })
  })
})