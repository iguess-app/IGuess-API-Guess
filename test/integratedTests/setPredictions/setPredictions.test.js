const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const injectedRequests = require('./injectedRequests')
const app = require('../../../app')
const server = app.configServer

lab.experiment('Integrated Test ==> setPredictions', () => {

  lab.test('setPredictions HappyPath', (done) => {
    server.inject(injectedRequests.happyPathRequest, (response) => {
      server.logger().info(response.result.championshipFixtureUserKey)
      const result = response.result
      expect(result.championshipFixtureUserKey).to.be.a.string()

      //TODO finalizar teste feliz depois de fechar contrato de saida para caso de sucesso nessa request
      done()
    })

  })
})