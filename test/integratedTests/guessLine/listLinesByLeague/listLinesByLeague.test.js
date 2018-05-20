'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/listLinesByLeague/listLinesByLeagueSchema').response

const portugueseDictionary = coincidents.Translate.gate.selectLanguage('pt-br')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> listLinesByLeague', () => {

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })
  
  lab.test('listLinesByLeague HappyPath', (done) => {
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

  lab.test('listLinesByLeague Translated HappyPath', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathTranslatedRequest.headers.token)
    server.inject(injectedRequests.happyPathTranslatedRequest)
      .then((response) => {
        const result = response.result
        expect(result[0].championship).to.be.equal(portugueseDictionary.brazilian)
        
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

})

/*eslint no-magic-numbers: 0*/