'use strict'

const coincidents = require('iguess-api-coincidents')
const coincidentsConfig = coincidents.Config

const guessConfig = {
  pageAliases: {
    nextPage: 'next',
    previousPage: 'previous',
    nearestPage: 'nearNext',
    askedPage: 'askedPage'
  }
}

module.exports = Object.assign(coincidentsConfig, guessConfig)