const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const injectedRequests = require('./injectedRequests')
const app = require('../../../app')
const server = app.configServer

lab.experiment('Integrated Test ==> getGuessLine', () => {

  lab.test('getGuessLine HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest)
    .then((response) => {
      const result = response.result
      expect(result.predictionsSetted).to.be.equal(true)
      done()
    })
  })

})