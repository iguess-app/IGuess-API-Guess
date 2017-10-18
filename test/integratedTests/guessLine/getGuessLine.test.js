const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const injectedRequests = require('./injectedRequests')
const server = require('../../../app')

lab.experiment('Integrated Test ==> getGuessLine', () => {

  lab.test.only('getGuessLine HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest)
    .then((response) => {
      const result = response.result

      expect(result.predictionsSetted).to.be.equal(true)
      done()
    })
  })

})

//TODO: Criar base e dump no/pro mongo para fazer esse teste funcionar