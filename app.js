'use strict'

require('./src/routines')
require('./src/routes')
const plugins = require('./config/plugins/serverPlugins')
const server = require('./configServer')

server.register(plugins, () => {
  server.start((err) => {
    if (err) {
      throw err
    }
  })
})

module.exports = server

/*const Prediction = require('./src/models/guessDB/predictionsModel')
const Match = require('./src/models/holiDB/matchModel')


Prediction.find({matchRef: 'MATCH_FROM'})
.then((matches) => {
  matches.forEach((match) => {
    match.matchUserRef = `MATCH_TO_${match.userRef}`
    match.matchRef = 'MATCH_TO'
    match.save()
  })
})

Match.remove({matchRef: 'MATCH_FROM'}) */