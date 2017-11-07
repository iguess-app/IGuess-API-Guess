'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/inviteToGuessLeague/inviteToGuessLeagueSchema').response
const removeHappyPathUserFromInvitedList = require('./lib/removeHappyPathUserFromInvitedList')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()

lab.experiment('Integrated Test ==> inviteToGuessLeague', () => {

  lab.before((done) => {
    removeHappyPathUserFromInvitedList()
      .then(() => done())
  })

  /**
   * IO Test
   * This test need to have 591e5c3fa8634f1f9880e8ba at invitead array on guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   */
  lab.test('inviteToGuessLeague HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('inviteToGuessLeague duplicated Inviteads List', (done) => {
    server.inject(injectedRequests.duplicatedInviteadsList)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.userRefDuplicated)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

})