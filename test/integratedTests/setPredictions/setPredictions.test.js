const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const injectedRequests = require('./injectedRequests')
const app = require('../../../app')
const server = app.configServer
const statusCode = app.coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> setPredictions', () => {

  lab.test('setPredictions HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest)
    .then((response) => {
      const result = response.result
      expect(result.predictionsSetted).to.be.equal(true)
      done()
    })
  })

  lab.test('setPredictions matchRefDuplicated', (done) => {
    server.inject(injectedRequests.matchRefDuplicated)
    .then((response) => {
      const result = response.result
      expect(result.statusCode).to.be.equal(statusCode.notAcceptable)
      expect(result.message).to.be.equal('You cannot do predictions to the same match at the same request')
      done()
    })
  })
})