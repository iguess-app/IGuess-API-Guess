'use strict'

const Promise = require('bluebird')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage
const sessionManager = require('../../managers/sessionManager')

const { listLeaguesWithActiveLinesRepository, countActivedLinesRepository } = require('../../repositories')

const listLeaguesWithActiveLines = async (headers) => {
  const dictionary = selectLanguage(headers.language)
  await sessionManager.getSession(headers, dictionary)

  const leagues = await listLeaguesWithActiveLinesRepository(dictionary)
  return getActivedLinesByLeague(leagues)
}

const getActivedLinesByLeague = (leagues) => {
  
  const promiseArray = leagues.map((league) => 
    Promise.all([countActivedLinesRepository(league.leagueRef), league])
  )

  return Promise.map(promiseArray, (leagueWithLineNumber) => {
    const league = leagueWithLineNumber[1]
    league.activeLines = leagueWithLineNumber[0]
    return league
  })
}
  

module.exports = listLeaguesWithActiveLines

/*eslint no-magic-numbers: 0*/