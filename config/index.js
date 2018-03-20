'use strict'

const coincidents = require('iguess-api-coincidents')
const coincidentsConfig = coincidents.Config

const guessConfig = {
  pageAliases: {
    greaterPage: 'next',
    previousPage: 'previous',
    greaterEqualPage: 'nearNext',
    previousEqualPage: 'nearPrev',
    askedPage: 'askedPage'
  }
}

module.exports = Object.assign(coincidentsConfig, guessConfig)