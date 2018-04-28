'use strict'

const Lab = require('lab')
const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/captain/putCaptainSchema').response
const GuessLeague = require('../../../../src/models/guessDB/guessesLeaguesModel')

const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()
const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> putCaptain', () => {

  lab.before((done) => {
    const searchQuery = { _id: '59c05e253feecf1e2898a3fb' }
    const updateQuery = { $pull: { captains: '5932d84626fee5502cb422d6' } }
    GuessLeague.update(searchQuery, updateQuery)
      .then(() => done())
  })

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })

  lab.test('putCaptain HappyPath', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequest.headers.token)    
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.ok)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('putCaptain userRefIsNotAtGuessLeague', (done) => {
    stubs.stubSessionRedis(injectedRequests.userInvitedIsAlreadyAdm.headers.token)    
    server.inject(injectedRequests.userInvitedIsAlreadyAdm)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.noGuessLeagueFound)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

  lab.test('putCaptainuserRefEqualuserRefToCaptain', (done) => {
    stubs.stubSessionRedis(injectedRequests.userRefEqualuserRefToCaptain.headers.token)    
    server.inject(injectedRequests.userRefEqualuserRefToCaptain)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.youCantBeTheUserAndUserAdm)
        expect(response.statusCode).to.be.equal(statusCode.conflict)
        done()
      })
  })

})