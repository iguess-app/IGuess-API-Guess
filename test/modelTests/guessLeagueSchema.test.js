const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const app = require('../../app')
const GuessLeague = app.src.models.guessesLeaguesModel
const serverErrors = app.coincidents.Utils.errorUtils.serverErrors

lab.experiment('Model Test ==> GuessLeagueSchema Validator', () => {

  lab.test('GuessLeagueSchema HappyPath', (done) => {
    const losBlancos = new GuessLeague({
      'guessLeagueName': 'losBlancos',
      'administrator': 'cristianoRonaldo',
      'championship': {
        '_id': '5872a8d2ed1b02314e088291',
        'league': '5872467bed1b02314e08828a',
        'season': '2016',
        'championship': 'Campeonato Brasileiro'
      },
      'inviteads': [
        'toniKross',
        'segioRamos',
        'marceloTwelve'
      ],
      'players': [{
        'userName': 'cristianoRonaldo'
      }]
    })
    losBlancos.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  lab.test('GuessLeagueSchema withOut Championship Embedded', (done) => {
    const losBlancos = new GuessLeague({
      'guessLeagueName': 'losBlancos',
      'administrator': 'cristianoRonaldo',
      'inviteads': [
        'toniKross',
        'segioRamos',
        'marceloTwelve'
      ],
      'players': [{
        'userName': 'cristianoRonaldo'
      }]
    })
    losBlancos.validate((err) => {
      expect(err.errors.championship).to.exists()
      expect(err.errors.championship.message).to.be.equal('Path `championship` is required.')
      done()
    })
  })

  lab.test('GuessLeagueSchema withOut inviteads', (done) => {
    const losBlancos = new GuessLeague({
      'guessLeagueName': 'losBlancos',
      'administrator': 'cristianoRonaldo',
      'championship': {
        '_id': '5872a8d2ed1b02314e088291',
        'league': '5872467bed1b02314e08828a',
        'season': '2016',
        'championship': 'Campeonato Brasileiro'
      },
      'players': [{
        'userName': 'cristianoRonaldo'
      }]
    })
    losBlancos.validate((err) => {
      expect(err.errors.inviteads.message).to.be.equal('Path `inviteads` is required.')
      done()
    })
  })

  lab.test('GuessLeagueSchema withOut guessLeagueName', (done) => {
    const losBlancos = new GuessLeague({
      'guessLeagueName': null,
      'administrator': 'cristianoRonaldo',
      'championship': {
        '_id': '5872a8d2ed1b02314e088291',
        'league': '5872467bed1b02314e08828a',
        'season': '2016',
        'championship': 'Campeonato Brasileiro'
      },
      'players': [{
        'userName': 'cristianoRonaldo'
      }],
      'inviteads': ['1', '1']
    })
    losBlancos.validate((err) => {
      expect(err.errors.guessLeagueName.message).to.be.equal('Path `guessLeagueName` is required.')
      done()
    })
  })

  lab.test('GuessLeagueSchema with championship subSchema wrong', (done) => {
    const losBlancos = new GuessLeague({
      'guessLeagueName': 'losBlancos',
      'administrator': 'cristianoRonaldo',
      'championship': {
        '_id': '5872a8d2ed1b02314e088291',
        'league': 'notObjectID',
        'championship': 'Campeonato Brasileiro'
      },
      'players': [{
        'userName': 'cristianoRonaldo'
      }],
      'inviteads': ['1', '1']
    })
    losBlancos.validate((err) => {
      expect(err.errors.championship.errors.league.message).to.be.equal(String(serverErrors.notMongoIdValid))
      expect(err.errors.championship.errors.season.message).to.be.equal('Path `season` is required.')
      done()
    })
  })
})