'use strict'

const Joi = require('joi')

const championshipEmbbededSchema = require('../../embeddedSchemas/championshipEmbeddedSchema')

const listToUserAddedAtGuessLines = Joi.object({
  onlyActive: Joi.bool().default(false),
  showPontuation: Joi.bool().default(false)
})

const listAllGuessLines = Joi.object({
  listAll: Joi.bool().required(),
  showPontuation: Joi.bool().only(false).default(false)
})

const request = Joi.alternatives().try(listToUserAddedAtGuessLines, listAllGuessLines)

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