'use strict'

const Joi = require('joi')

const addUserToGuessLineSchemaResponse = {
  schema: Joi.object({
    userAddedToGuessLine: Joi.bool().required()
  }).meta({
    className: 'Response'
  })
}

module.exports = addUserToGuessLineSchemaResponse