const fs = require('fs')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const app = require('../../app')
const Pontuation = app.src.models.pontuationsModel
const serverErrors = app.coincidents.Utils.errorUtils.serverErrors

const pontuationSchemas = JSON.parse(fs.readFileSync('test/modelTests/SchemaFiles/pontuationSchemasFile.json'))

lab.experiment('Model Test ==> PontuationSchema Validator', () => {

  lab.test('PontuationSchema HappyPath', (done) => {
    const correctSchema = new Pontuation(pontuationSchemas.correctSchema)
    correctSchema.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  lab.test('championshipUserKeyWrongSchema', (done) => {
    const championshipUserKeyWrongSchema = new Pontuation(pontuationSchemas.championshipUserKeyWrong)
    championshipUserKeyWrongSchema.validate((err) => {
      expect(err.errors.championshipUserKey.message).to.be.equal(String(serverErrors.notchampionshipUserKeyValid))
      done()
    })
  })

  lab.test('withoutPontuationByFixtureSchema', (done) => {
    const withoutPontuationByFixtureSchema = new Pontuation(pontuationSchemas.withoutPontuationByFixture)
    withoutPontuationByFixtureSchema.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  lab.test('without Pontuation By Fixture And Without Total Pontuation', (done) => {
    const withoutPontuationByFixtureAndWithoutTotalPontuationSchema = new Pontuation(pontuationSchemas.withoutPontuationByFixtureAndWithoutTotalPontuation)
    withoutPontuationByFixtureAndWithoutTotalPontuationSchema.validate((err) => {
      expect(err.errors.totalPontuation.message).to.be.equal('Path `totalPontuation` is required.')
      done()
    })
  })
})