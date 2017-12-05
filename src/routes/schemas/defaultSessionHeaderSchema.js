'use strict'

const Joi = require('joi')

const defaultSessionHeaderSchema = Joi.object({
  language: Joi.string().default('en-us')
}).unknown()

module.exports = defaultSessionHeaderSchema