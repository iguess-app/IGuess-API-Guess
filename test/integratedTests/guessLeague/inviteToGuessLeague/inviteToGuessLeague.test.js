'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/inviteToGuessLeague/inviteToGuessLeagueSchema').response
const GuessLeague = require('../../../../src/models/guessDB/guessesLeaguesModel')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()

const QUANTITY_TO_REMOVE = 1

lab.experiment('Integrated Test ==> inviteToGuessLeague', () => {

  lab.before((done) => {
     const searchQuery = {
      'championship.championshipRef': '5872a8d2ed1b02314e088291',
      'inviteads': {
        '$in': [injectedRequests.happyPathRequest.payload.userRefInviteads[0]]
      }
    }
    GuessLeague.findOne(searchQuery)
      .then((guessLeagueFound) => {
        if (!guessLeagueFound) {
          return Promise.resolve()
        }
        guessLeagueFound.inviteads.splice(
          guessLeagueFound.inviteads.indexOf(injectedRequests.happyPathRequest.payload.userRefInviteads[0]), QUANTITY_TO_REMOVE
        )
        return guessLeagueFound.save()
      })
      .then(() => done())
  })

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

})