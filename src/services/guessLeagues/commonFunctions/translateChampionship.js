'use strict'

const translateTheChampionshipName = (guessLeague, dictionary) => {
  guessLeague.championship.championship = dictionary[guessLeague.championship.translateFlag]
  Reflect.deleteProperty(guessLeague.championship, 'translateFlag')
  return guessLeague
}

module.exports = translateTheChampionshipName