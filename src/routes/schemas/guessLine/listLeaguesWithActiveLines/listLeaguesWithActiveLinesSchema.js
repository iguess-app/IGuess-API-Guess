'use strict'

const Joi = require('joi')

const response = Joi.array().items({
  leagueRef: Joi.object().required(),
  country: Joi.string().required(),
  name: Joi.string().required(),
  association: Joi.string().required(),
  continental: Joi.bool().required(),
  flag: {
      mini: Joi.string().allow('').required(),
      small: Joi.string().allow('').required(),
      normal: Joi.string().allow('').required()
  },
  activeLines: Joi.number().required()
})

module.exports = {
  response
}