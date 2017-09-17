const Joi = require('joi');
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const schemasExample = require('./schemasExample')
const app = require('../../../app')
const schemas = app.src.routes.schemas.guessLine

lab.experiment('Schemas Test ==> setPredictions', () => {

  lab.test('setPredictions HappyPath', (done) => {
    const schemaTest = schemasExample.happyPathSchema
    const setPredictionsSchema = schemas.setPredictions.setPredictionsSchemaPayload
    Joi.validate(schemaTest, setPredictionsSchema, (err) => {
      expect(err).to.be.equal(null)
      done()
    })
  })

  lab.test('setPredictions homeTeamScoreGuessTooLowSchema', (done) => {
    const schemaTest = schemasExample.homeTeamScoreGuessTooLowSchema
    const setPredictionsSchema = schemas.setPredictions.setPredictionsSchemaPayload
    Joi.validate(schemaTest, setPredictionsSchema, (err) => {
      expect(err.details[0].message).to.be.equal('"homeTeamScoreGuess" must be larger than or equal to 0')
      done()
    })
  })
})

/*eslint no-magic-numbers: 0*/