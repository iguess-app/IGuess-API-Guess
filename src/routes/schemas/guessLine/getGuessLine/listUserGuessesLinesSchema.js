'use strict'

const Joi = require('joi')

const championshipEmbbededSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const request = Joi.object({
  onlyActive: Joi.bool().default(false),
  showPontuation: Joi.bool().default(false)
})

const response = Joi.array().items(
  Joi.object({
    championship: championshipEmbbededSchema.required(),
    guessLineActive: Joi.bool().required(),
    pontuation: Joi.number()
  })
) 

module.exports = {
  request,
  response
}