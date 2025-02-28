'use strict'

const Lab = require('lab')
const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/createGuessLeague/createGuessLeagueSchema').response
const GuessLeague = require('../../../../src/models/guessDB/guessesLeaguesModel')

const { errorCode } = coincidents.Utils
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

  lab.afterEach((done) => {
    stubs.restoreSessionRedisStub()
    done()
  })

  lab.test('createGuessLeague HappyPath', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequest.headers.token)    
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

  /*This test depends of userRef '59b54e44a7631d433470fee7' to be at least on five guessLeagues like player
  * SKIPING WHILE THE MAX NUMBER IT IS MORE THAN 5 (DURING THE WORLD CUP)
  */
  lab.test.skip('createGuessLeague max guessLeague allowed explode', (done) => {
    stubs.stubSessionRedis(injectedRequests.maxGuessLeagueExplode.headers.token)    
    server.inject(injectedRequests.maxGuessLeagueExplode)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.noMoreGuessLeagueAllowed)
        expect(result.errorCode).to.be.equal(errorCode.noMoreGuessLeagueAllowed)
        expect(response.statusCode).to.be.equal(statusCode.forbidden)
        done()
      })
  })
  
  /*This test depends of userRef '5b10bd714a20c05484ed81e5' to be at guessline with championshipRef 5872a8d2ed1b02314e088291 */
  /*This test depends of userRef '59b54e44a7631d433470fee7' to be at least on five guessLeagues like player 
  * SKIPING WHILE THE MAX NUMBER IT IS MORE THAN 5 (DURING THE WORLD CUP)  
  */
  lab.test.skip('createGuessLeague max guessLeague allowed at inviteads', (done) => {
    stubs.stubSessionRedis(injectedRequests.maxGuessLeagueExplodeAtInviteads.headers.token)    
    server.inject(injectedRequests.maxGuessLeagueExplodeAtInviteads)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.created)
        result.players.forEach((player) => expect('59b54e44a7631d433470fee7').to.be.not.equal(player))
        expect(result.allInviteadsAdded).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('createGuessLeague Twice Invited (Adm inviting himself)', (done) => {
    stubs.stubSessionRedis(injectedRequests.admInvitingHimself.headers.token)    
    server.inject(injectedRequests.admInvitingHimself)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.userRefDuplicated)
        expect(result.errorCode).to.be.equal(errorCode.userRefDuplicated)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

  lab.test('createGuessLeague Twice Invited (Duplicated Inviteads)', (done) => {
    stubs.stubSessionRedis(injectedRequests.duplicatedInviteads.headers.token)    
    server.inject(injectedRequests.duplicatedInviteads)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.userRefDuplicated)
        expect(result.errorCode).to.be.equal(errorCode.userRefDuplicated)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

  lab.test('createGuessLeague Invitator User not at GuessLine', (done) => {
    stubs.stubSessionRedis(injectedRequests.invitatorUserNotAtGussLine.headers.token)    
    server.inject(injectedRequests.invitatorUserNotAtGussLine)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notAtGuessLine)
        expect(result.errorCode).to.be.equal(errorCode.notAtGuessLine)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })
  
})