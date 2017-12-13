'use strict'

const sinon = require('sinon')

const sessionManager = require('../../src/managers/sessionManager')

const stubSessionRedis = (userRef) => {
  const stubResponseObj = {
    hardwareFingerPrint: 'integratedTest',
    userRef
  }
  sinon.stub(sessionManager, 'getSession')
  .returns(Promise.resolve(stubResponseObj))  
}
  

const restoreSessionRedisStub = () => sessionManager.getSession.restore()

module.exports = {
  stubSessionRedis,
  restoreSessionRedisStub
}