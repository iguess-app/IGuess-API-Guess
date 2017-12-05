'use strict'

const Joi = require('joi')

const addUserToGuessLineSchemaResponse = {
  schema: Joi.object({
    userAddedToGuessLine: Joi.bool().required()
  })
}

module.exports = addUserToGuessLineSchemaResponse