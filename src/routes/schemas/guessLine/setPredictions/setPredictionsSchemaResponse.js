'use strict'

const Joi = require('joi')

const setPredictionsSchemaResponse = Joi.object({
  predictionsSetted: Joi.bool()
})

module.exports = setPredictionsSchemaResponse