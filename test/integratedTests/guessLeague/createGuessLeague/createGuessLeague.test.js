'use strict'

const Lab = require('lab')
const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/createGuessLeague/createGuessLeagueSchema').response
const GuessLeague = require('../../../../src/models/guessDB/guessesLeaguesModel')

const statusCode = coincidents.Utils.statusUtils
const dictionary = coincidents.Translate.gate.selectLanguage()
const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> createGuessLeague', () => {

  lab.before((done) => {
    const searchQuery = {
      guessLeagueName: 'Integrated Test GuessLeague'
    }
    GuessLeague.remove(searchQuery)
      .then(() => done())
  })

  lab.test('createGuessLeague HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.created)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('createGuessLeague Twice Invited (Adm inviting himself)', (done) => {
    server.inject(injectedRequests.admInvitingHimself)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.userRefDuplicated)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

  lab.test('createGuessLeague Twice Invited (Duplicated Inviteads)', (done) => {
    server.inject(injectedRequests.duplicatedInviteads)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.userRefDuplicated)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

  lab.test('createGuessLeague Invitator User not at GuessLine', (done) => {
    server.inject(injectedRequests.invitatorUserNotAtGussLine)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notAtGuessLine)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })
  
})