'use strict'

const addAndUpdateActivityGuessLinesRoutine = require('../../routines/addNewAndUpdateGuessLinesActivityRoutine/addAndUpdateActivityGuessLinesRoutine').getAllchampionshipFromHoli
const updateGuessLinesPredictionsPontuationsRoutine = require('../../routines/updatePontuationsRoutine/routine').updatePredictionsPontuationWithFixtureForced
const server = require('../../../configServer')
const defaultSessionHeaderSchema = require('../schemas/defaultSessionHeaderSchema').defaultSessionHeaderSchema
const updateGuessLinesPredictionsPontuationsSchemaRequest = require('../schemas/guessLine/forceRoutines/updateGuessLinesPredictionsPontuationsSchemaRequest')

server.route({
  path: '/guessline/forceRoutine/addAndUpdateActivityGuessLines',
  method: 'PUT',
  config: {
    handler: (request, reply) => {
      addAndUpdateActivityGuessLinesRoutine()
      reply('RoutineForced')
    }
  }
})

server.route({
  path: '/guessline/forceRoutine/updateGuessLinesPredictionsPontuationsRoutine',
  method: 'PUT',
  config: {
    handler: (request, reply) => {
      updateGuessLinesPredictionsPontuationsRoutine(request.query)
      reply('RoutineForced')
    },
    validate: {
      query: updateGuessLinesPredictionsPontuationsSchemaRequest,
      headers: defaultSessionHeaderSchema
    }
  }
})