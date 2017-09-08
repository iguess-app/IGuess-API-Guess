'use strict'

const Joi = require('joi')

module.exports = () => {

  const addUserToGuessLineSchemaResponse = {
    schema: Joi.object({
      userAddedToGuessLine: Joi.bool().required()
    }).meta({
      className: 'Response'
    })
  }

  return addUserToGuessLineSchemaResponse
}