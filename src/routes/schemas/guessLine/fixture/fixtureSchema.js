const Joi = require('joi')

module.exports = (app) => {
  const Config = app.coincidents.Config
  const MAX_ROUND_ROBIN_FIXTURES = Config.holi.maxRoundRobinFixtures
  const MIN_ROUND_ROBIN_FIXTURES = Config.holi.minRoundRobinFixtures
  const KNOCKOUT_TOURNAMENT_ROUND_NAMES = Config.holi.knockoutTournamentRoundNames

  const fixtureSchema = Joi.alternatives().try(
    Joi.number().min(MIN_ROUND_ROBIN_FIXTURES).max(MAX_ROUND_ROBIN_FIXTURES).description('Round-robin tournament'),
    Joi.any().valid(KNOCKOUT_TOURNAMENT_ROUND_NAMES).description('Knockout tournaments'))

  return fixtureSchema
}