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
   * This test need to have 59b54e44a7631d433470fee7 like a captain from guessLeague ObjectId("59c05e253feecf1e2898a3fb")
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
  
  /**
   * IO Test
   * This test need to have 59b54e44a7631d433470fee7 like a captain from guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   * This test need to 591e5c36a8634f1f9880e8b8 does not be added at championship guessLine 5872a8d2ed1b02314e088291 
   */
  lab.test('inviteToGuessLeague not At GuessLine', (done) => {
    server.inject(injectedRequests.notAtGuessLine)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notAtGuessLine)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })

  /**
   * IO Test
   * This test need to have 59b54e44a7631d433470fee7 like a captain from guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   * This test need to 591e5c98a8634f1f9880e8c4 added at ObjectId("59c05e253feecf1e2898a3fb") GuessLeague inviteads array
   */
  lab.test('inviteToGuessLeague already At Invitead List', (done) => {
    server.inject(injectedRequests.alreadyAtInviteadList)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.someWrongAtInvite)
        expect(response.statusCode).to.be.equal(statusCode.forbidden)
        done()
      })
  })

  /**
   * IO Test
   * This test need to have 59b54e44a7631d433470fee7 like a captain from guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   * This test need to 591e5bbba8634f1f9880e8aa added at ObjectId("59c05e253feecf1e2898a3fb") GuessLeague players array
   */
  lab.test('inviteToGuessLeague already Add', (done) => {
    server.inject(injectedRequests.alreadyAdd)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.someWrongAtInvite)
        expect(response.statusCode).to.be.equal(statusCode.forbidden)
        done()
      })
  })


  /**
   * IO Test
   * This test need to 591e5bbba8634f1f9880e8aa added at ObjectId("59c05e253feecf1e2898a3fb") GuessLeague players array and
   * not added at captains array
   * And need to 591e5c63a8634f1f9880e8c0 be added at championship guessLine 5872a8d2ed1b02314e088291 
   */
  lab.test('inviteToGuessLeague not Captain Try To Add', (done) => {
    server.inject(injectedRequests.notCaptainTryToAdd)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.someWrongAtInvite)
        expect(response.statusCode).to.be.equal(statusCode.forbidden)
        done()
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