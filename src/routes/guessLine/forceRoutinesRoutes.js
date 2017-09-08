'use strict'

module.exports = (app) => {
  const server = app.configServer
  const addAndUpdateActivityGuessLinesRoutine = app.src.routines.addAndUpdateActivityGuessLinesRoutine

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
}