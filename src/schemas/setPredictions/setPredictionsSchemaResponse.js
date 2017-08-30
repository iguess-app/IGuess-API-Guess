'use strict'

const Joi = require('joi')

module.exports = () => {

  const setPredictionsSchemaResponse = Joi.object({
    predictionsSetted: Joi.bool()
  })

  return setPredictionsSchemaResponse
}