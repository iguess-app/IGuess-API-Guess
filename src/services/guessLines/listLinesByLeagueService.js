'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage
const sessionManager = require('../../managers/sessionManager')

const { listLinesByLeagueRepository } = require('../../repositories')

const listLeaguesWithActiveLines = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  await sessionManager.getSession(headers, dictionary)

  const lines = await listLinesByLeagueRepository(payload, dictionary)
  return lines
}
 

module.exports = listLeaguesWithActiveLines

//TODO: Added Integrated Test to listLinesByLeague