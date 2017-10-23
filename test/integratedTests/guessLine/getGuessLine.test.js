'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../app')
const schemaValidate = require('../../../src/routes/schemas/guessLine/getGuessLine/getGuessLineSchema').response

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()

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

  lab.test('getGuessLine not Found', (done) => {
    server.inject(injectedRequests.guesslineNotFoundWrongChampionship)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.guessLineNotFound)
        done()
      })
  })

  lab.test('getGuessLine not Found', (done) => {
    server.inject(injectedRequests.guesslineNotFoundWrongUser)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.guessLineNotFound)
        done()
      })
  })
})