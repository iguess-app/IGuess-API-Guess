'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLine/getGuessLine/getGuessLineSchema').response

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()

lab.experiment('Integrated Test ==> getGuessLine', () => {
  
  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })

  lab.test('getGuessLine HappyPath', (done) => {
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

  lab.test('getGuessLine not Found wrong ChampionshipRef', (done) => {
    stubs.stubSessionRedis(injectedRequests.guesslineNotFoundWrongChampionship.headers.token)
    server.inject(injectedRequests.guesslineNotFoundWrongChampionship)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.guessLineNotFound)
        done()
      })
  })

  lab.test('getGuessLine not Found', (done) => {
    stubs.stubSessionRedis(injectedRequests.guesslineNotFoundWrongUser.headers.token)
    server.inject(injectedRequests.guesslineNotFoundWrongUser)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.guessLineNotFound)
        done()
      })
  })

  //TODO: Adicionar um cenario de teste que devolve um guessLine matchDay com match in live e devolva os minutes e o started=true e allowToPredict=false
  //TODO: fazer um que fixe o allowToPredict=true
  //TODO: Testar melhor a paginação
})