const fs = require('fs')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const Prediction = require('../../../src/models/guessDB/predictionsModel')
const serverErrors = require('iguess-api-coincidents').Utils.errorUtils.serverErrors

const predictionSchemas = JSON.parse(fs.readFileSync('test/unitTests/modelTests/SchemaFiles/predictionSchemasFile.json'))

lab.experiment('Model Test ==> PredictionSchema Validator', () => {

  lab.test('PredictionSchema HappyPath', (done) => {
    const correctSchema = new Prediction(predictionSchemas.correctSchema)
    correctSchema.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  lab.test('PredictionSchema wrongMatchUserRefKey', (done) => {
    const someErrorsSchema = new Prediction(predictionSchemas.wrongMatchUserRefKey)
    someErrorsSchema.validate((err) => {
      expect(err.errors.matchUserRef.message).to.be.equal(String(serverErrors.notchampionshipFixtureUserKeyValid))
      done()
    })
  })

  lab.test('GuessLineSchema userData Wrong', (done) => {
    const guessesDataWrongSchema = new Prediction(predictionSchemas.guessesDataWrong)
    guessesDataWrongSchema.validate((err) => {
      expect(err.errors.matchRef.message).to.be.equal(String(serverErrors.notMongoIdValid))
      expect(err.errors.predictionSentDate.message).to.be.equal('Path `predictionSentDate` is required.')
      expect(err.errors.championshipRef.message).to.be.equal('Path `championshipRef` is required.')
      expect(err.errors.matchUserRef.message).to.be.equal('Path `matchUserRef` is required.')
      done()
    })
  })
  
  lab.test('GuessLineSchema without UserRef', (done) => {
    const guessesDataWrongSchema = new Prediction(predictionSchemas.withOutUserRef)
    guessesDataWrongSchema.validate((err) => {
      expect(err.errors.userRef.message).to.be.equal('Path `userRef` is required.')
      done()
    })
  })
  
})