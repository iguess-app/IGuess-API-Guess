'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/inviteResponse/inviteResponseSchema').response

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()

const GuessLeague = require('../../../../src/models/guessDB/guessesLeaguesModel')

lab.experiment.only('Integrated Test ==> inviteResponse', () => {

  lab.before((done) => {
    const searchQuery = {
      'championship.championshipRef': '5872a8d2ed1b02314e088291'
    }

    GuessLeague.findOne(searchQuery)
      .then((guessLeagueFound) => {
        const happyPathYesResponseUserRef = injectedRequests.happyPathResponseYesRequest.payload.userRef
        const index = guessLeagueFound.players.findIndex((playerRef) => happyPathYesResponseUserRef === playerRef)
        if (index !== -1) {
          guessLeagueFound.players.splice(index, 1)
        }

        if (guessLeagueFound.inviteads.indexOf(happyPathYesResponseUserRef) === -1) {
          guessLeagueFound.inviteads.push(happyPathYesResponseUserRef)
        }

        guessLeagueFound.save()
      })
      .then(() => done())
  })

  /**
   * IO Test
   * This test need to 591e5ccca8634f1f9880e8ca be at invitead array on guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   * This test need to 591e5ccca8634f1f9880e8ca be not at players array on guessLeague ObjectId("59c05e253feecf1e2898a3fb")
   */
  lab.test('[IO] inviteResponse HappyPath', (done) => {
    server.inject(injectedRequests.happyPathResponseYesRequest)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

})