'use strict';

const consign = require('consign')
const app = {}
app.coincidents = require('iguess-api-coincidents')
const plugins = require('./config/plugins/serverPlugins')(app.coincidents.Config)

consign()
  .include('configServer.js')
  .include('src/models')
  .include('src/repositories')
  .include('src/routines')
  .exclude('src/routines/updatePontuationsRoutine/functions')
  .include('src/services')
  .include('src/controllers')
  .include('src/schemas')
  .include('src/routes')
  .into(app);


app.configServer.register(plugins, () => {
  app.configServer.start((err) => {
    if (err) {
      throw err;
    }
  })
})

module.exports = app