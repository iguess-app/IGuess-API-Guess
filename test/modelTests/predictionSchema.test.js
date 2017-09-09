const fs = require('fs')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const app = require('../../app')
const Prediction = app.src.models.predictionsModel
const serverErrors = app.coincidents.Utils.errorUtils.serverErrors

const predictionSchemas = JSON.parse(fs.readFileSync('test/modelTests/SchemaFiles/predictionSchemasFile.json'))

lab.experiment('Model Test ==> PredictionSchema Validator', () => {

  lab.test('PredictionSchema HappyPath', (done) => {
    const correctSchema = new Prediction(predictionSchemas.correctSchema)
    correctSchema.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  lab.test('PredictionSchema wrongChampionshipFixtureUserKey', (done) => {
    const someErrorsSchema = new Prediction(predictionSchemas.wrongChampionshipFixtureUserKey)
    someErrorsSchema.validate((err) => {
      expect(err.errors.championshipFixtureUserKey.message).to.be.equal(String(serverErrors.notchampionshipFixtureUserKeyValid))
      done()
    })
  })

  lab.test('GuessLineSchema userData Wrong', (done) => {
    const guessesDataWrongSchema = new Prediction(predictionSchemas.guessesDataWrong)
    guessesDataWrongSchema.validate((err) => {
      expect(err.errors['guesses.0.matchRef'].message).to.be.equal(String(serverErrors.notMongoIdValid))
      expect(err.errors['guesses.1.matchRef'].message).to.be.equal(String(serverErrors.notMongoIdValid))
      expect(err.errors['guesses.2.matchRef'].message).to.be.equal(String(serverErrors.notMongoIdValid))
      expect(err.errors['guesses.2.homeTeamScore'].message).to.be.equal('Path `homeTeamScore` is required.')
      expect(err.errors.fixturePontuation.message).to.be.equal('Cast to Number failed for value "Not a Number" at path "fixturePontuation"')
      done()
    })
  })
})