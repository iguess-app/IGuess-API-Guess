'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage
const sessionManager = require('../../managers/sessionManager')

const { listLinesByLeagueRepository } = require('../../repositories')

const listLeaguesWithActiveLines = async (payload, headers) => {
  const dictionary = selectLanguage(headers.language)
  await sessionManager.getSession(headers, dictionary)

  const championshipList = await listLinesByLeagueRepository(payload, dictionary)
  return _translateTheChampionshipName(championshipList, dictionary)
}
 
const _translateTheChampionshipName = (championshipList, dictionary) => 
  championshipList.map((championship) => {
    championship.championship = dictionary[championship.translateFlag]
    Reflect.deleteProperty(championship, 'translateFlag')
    return championship
  })

module.exports = listLeaguesWithActiveLines