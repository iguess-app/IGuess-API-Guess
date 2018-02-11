'use strict'

const Joi = require('joi')

const defaultSessionHeaderSchema = Joi.object({
  language: Joi.string().default('en-us'),
  request_id: Joi.string().required(),
  hardware_fingerprint: Joi.string().required(),
  platform: Joi.string().required(),
  os_version: Joi.string().required(),
  app_version: Joi.string().required(),
  phone_model: Joi.string().required(),
  phone_fabricator: Joi.string().required(),
  token: Joi.string().required()
}).unknown()

module.exports = {
  defaultSessionHeaderSchema
}

/*eslint camelcase:0 */