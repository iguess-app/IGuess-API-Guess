'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/inviteResponse/inviteResponseSchema').response
const preTestLogic = require('./lib/preTestLogic')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()

lab.experiment('Integrated Test ==> inviteResponse', () => {

  lab.before((done) => {
    preTestLogic()
      .then(() => done())
  })

  /**
   * IO Test
   * This test need to 591e5ccca8634f1f9880e8ca be at championship guessLine 5872a8d2ed1b02314e088291 
   * This test need to 591e5ccca8634f1f9880e8ca be at invitead array on guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   * This test need to 591e5ccca8634f1f9880e8ca be not at players array on guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   */
  lab.test('[IO] inviteResponse (Reponse like Yes) HappyPath', (done) => {
    server.inject(injectedRequests.happyPathResponseYesRequest)
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
   * This test need to 591e5cdaa8634f1f9880e8cc be at championship guessLine 5872a8d2ed1b02314e088291 
   * This test need to 591e5cdaa8634f1f9880e8cc be at invitead array on guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   */
  lab.test('[IO] inviteResponse (Reponse like Not) HappyPath', (done) => {
    server.inject(injectedRequests.happyPathResponseNotRequest)
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
   * This test need to 591e5c36a8634f1f9880e8b8 does not be added at championship guessLine 5872a8d2ed1b02314e088291 
   */
  lab.test('[IO] inviteResponse user not At GuessLine', (done) => {
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
   * This test need to 591e5c21a8634f1f9880e8b4 be at championship guessLine 5872a8d2ed1b02314e088291 
   * This test need to 591e5c21a8634f1f9880e8b4 does not be at guessLeague ObjectId("59c05e253feecf1e2898a3fb") invitead list  
   */
  lab.test('[IO] inviteResponse user not At Invitead List', (done) => {
    server.inject(injectedRequests.userNotAtInviteadsList)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.someWrongAtInvite)
        expect(response.statusCode).to.be.equal(statusCode.forbidden)
        done()
      })
  })

  /**
   * IO Test
   * This test need to 59b54e44a7631d433470fee7 be at championship guessLine 5872a8d2ed1b02314e088291 
   * This test need to 59b54e44a7631d433470fee7 be at guessLeague ObjectId("59c05e253feecf1e2898a3fb") player list  
   */
  lab.test('[IO] inviteResponse user already at players List', (done) => {
    server.inject(injectedRequests.userAlreadyAtPlayersList)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.someWrongAtInvite)
        expect(response.statusCode).to.be.equal(statusCode.forbidden)
        done()
      })
  })

  /**
   * IO Test
   * This test need to 591e5ccca8634f1f9880e8ca be at championship guessLine 5872a8d2ed1b02314e088291 
   */
  lab.test('[IO] inviteResponse guessLeague Not Found', (done) => {
    server.inject(injectedRequests.guessLeagueNotFound)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.someWrongAtInvite)
        expect(response.statusCode).to.be.equal(statusCode.forbidden)
        done()
      })
  })
})