'use strict'

const sinon = require('sinon')

const sessionManager = require('../../../../../src/managers/sessionManager')

const stubSessionRedis = (userRef) => 
  sinon.stub(sessionManager, 'getSession')
    .withArgs(userRef)
    .returns(Promise.resolve({userRef}))  

const restoreStub = () => sessionManager.getSession.restore()

module.exports = {
  stubSessionRedis,
  restoreStub
}