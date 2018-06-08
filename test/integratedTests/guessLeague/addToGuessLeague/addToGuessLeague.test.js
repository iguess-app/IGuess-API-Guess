'use strict'

const Lab = require('lab')
const Joi = require('joi')
const coincidents = require('iguess-api-coincidents')

const stubs = require('../../../lib/stubs')
const injectedRequests = require('./injectedRequests')
const server = require('../../../../app')
const schemaValidate = require('../../../../src/routes/schemas/guessLeague/addToGuessLeague/addToGuessLeagueSchema').response
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
  
  /*This test depends of userRef be at '5b10b7a133ca7a5c3c89a0df' to be at guessline with championshipRef:'59a8ae40bf3e53253bec3d23'  */
  /*This test depends of userRef be at '5b10b7a133ca7a5c3c89a0df' to be at guessleague with leagueRef:'5b19f4a797ff10dbf4206bbf'  */
  /*This test depends of userRef not be at '5aad4b885680043904b40415' to be at guessline with championshipRef:'59a8ae40bf3e53253bec3d23' */
  lab.test('AddtoGuessLeague HappyPath', (done) => {
    stubs.stubSessionRedis(injectedRequests.happyPathRequest.headers.token)    
    server.inject(injectedRequests.happyPathRequest)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          expect(result.usersAddedSuccessfully).to.be.equal(true)
          done()
        })
      })
  })

  /*This test depends of userRef '5b10b7a133ca7a5c3c89a0df' to be at guessline with championshipRef:'59a8ae40bf3e53253bec3d23' */
  lab.test('AddtoGuessLeague user not At Guessline', (done) => {
    stubs.stubSessionRedis(injectedRequests.notAtGuessline.headers.token)    
    server.inject(injectedRequests.notAtGuessline)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.notAtGuessLine)
        expect(result.errorCode).to.be.equal(errorCode.notAtGuessLine)
        expect(response.statusCode).to.be.equal(statusCode.notFound)
        done()
      })
  })
  
  lab.test('AddtoGuessLeague user not At Guessline', (done) => {
    stubs.stubSessionRedis(injectedRequests.duplicatedPlayers.headers.token)    
    server.inject(injectedRequests.duplicatedPlayers)
      .then((response) => {
        const result = response.result
        expect(result.message).to.be.equal(dictionary.userRefDuplicated)
        expect(result.errorCode).to.be.equal(errorCode.userRefDuplicated)
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        done()
      })
  })

})