module.exports = (app) => {
  const Config = app.coincidents.Config
  const MAX_ROUND_ROBIN_FIXTURES = Config.holi.maxRoundRobinFixtures
  const MIN_ROUND_ROBIN_FIXTURES = Config.holi.minRoundRobinFixtures
  const KNOCKOUT_TOURNAMENT_ROUND_NAMES = Config.holi.knockoutTournamentRoundNames

  const _ifIsKnockoutTournament = (fixture) => KNOCKOUT_TOURNAMENT_ROUND_NAMES.includes(fixture)
  const _ifIsRoundRobinTournament = (fixture) => fixture >= MIN_ROUND_ROBIN_FIXTURES && fixture <= MAX_ROUND_ROBIN_FIXTURES && Number.isInteger(fixture)
  const validateFixture = (fixture) => _ifIsKnockoutTournament(fixture) || _ifIsRoundRobinTournament(Number(fixture))

  return validateFixture
}