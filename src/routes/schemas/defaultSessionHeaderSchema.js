'use strict'

const Joi = require('joi')

const defaultSessionHeaderSchema = Joi.object({
  language: Joi.string().default('en-us')
}).unknown()

const tempHeader = Joi.object({
  language: Joi.string().default('en-us'),
  token: Joi.string().required()
}).unknown()

module.exports = {
  defaultSessionHeaderSchema,
  tempHeader
}