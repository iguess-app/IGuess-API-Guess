'use strict'

const CronJob = require('cron').CronJob

const Seconds = 20
const Minutes = 39
const Hours = 23
const fullHour = `${Seconds} ${Minutes} ${Hours}`
const dayOfMonth = '*'
const months = '*'
const dayOfWeek = '*'

module.exports = (app) => {
  const requestManager = app.coincidents.Managers.requestManager

  return new CronJob(`${fullHour} ${dayOfMonth} ${months} ${dayOfWeek}`, () => {
    //TODO usar app.coincidents.apis.holiUrl na url
    const url = 'http://localhost:9001/championship/getAllchampionship'
    const headers = {
      'language': 'en-us',
      'content-type': 'application/json'
    }
    requestManager.get(url, headers)
      .then((championships) => {
        _addGuessLines(app, championships)
      })

  }, null, true, 'America/Sao_Paulo')
}


const _addGuessLines = (app, championships) => {
  const GuessLines = app.coincidents.Schemas.guessesLinesSchema;
  championships.map((championship) => {
    const searchQuery = {
      'championship.championshipRef': championship._id
    }
    GuessLines.findOne(searchQuery)
    .then((guessLine) => {
      if (!guessLine) {
        _insertNewGuessLine(championship)
        return
      }
      //TODO update nas flags isActive da GuessLine que já existir
    })
  })
}

const _insertNewGuessLine = (championship) => {
   
}
