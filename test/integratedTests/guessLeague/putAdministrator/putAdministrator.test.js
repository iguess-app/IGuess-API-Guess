'use strict'

const Lab = require('lab')
const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/administration/putCaptainSchema').response
const GuessLeague = require('../../../../src/models/guessDB/guessesLeaguesModel')

const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()
const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> putCaptain', () => {

  lab.before((done) => {
    const searchQuery = { _id: '59c05e253feecf1e2898a3fb' }
    const updateQuery = { $pull: { administrators: '5932d84626fee5502cb422d6' } }
    GuessLeague.update(searchQuery, updateQuery)
      .then(() => done())
  })

  lab.test('putCaptain HappyPath', (done) => {
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
      server.inject(injectedRequests.userInvitedIsAlreadyAdm)
        .then((response) => {
          const result = response.result
          expect(result.message).to.be.equal(dictionary.anyGuessLeagueFound)
          expect(response.statusCode).to.be.equal(statusCode.notFound)
          done()
        })
    })

    lab.test('putCaptainuserRefEqualUserRefToAdm', (done) => {
      server.inject(injectedRequests.userRefEqualUserRefToAdm)
        .then((response) => {
          const result = response.result
          expect(result.message).to.be.equal(dictionary.youCantBeTheUserAndUserAdm)
          expect(response.statusCode).to.be.equal(statusCode.conflict)
          done()
        })
    })

})