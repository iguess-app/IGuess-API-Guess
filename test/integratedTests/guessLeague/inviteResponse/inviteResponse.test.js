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

})