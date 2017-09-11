'use strict'

module.exports = (app) => {
  const server = app.configServer
  const addAndUpdateActivityGuessLinesRoutine = app.src.routines.addNewAndUpdateGuessLinesActivityRoutine.addAndUpdateActivityGuessLinesRoutine
  const updateGuessLinesPredictionsPontuationsRoutine = app.src.routines.updatePontuationsRoutine.updateGuessLinesPredictionsPontuationsRoutine
  
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
        updateGuessLinesPredictionsPontuationsRoutine()
        reply('RoutineForced')
      }
    }
  })
}