const happyPathRequest = {
  method: 'GET',
  url: '/guessline/getGuessLine?championshipRef=5872a8d2ed1b02314e088291',
  headers: {
    'token': '59bddea6e7c8a12658c0c08a',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const happyPathWithTranslateChampionshipRequest = {
  method: 'GET',
  url: '/guessline/getGuessLine?championshipRef=5872a8d2ed1b02314e088291',
  headers: {
    'token': '59bddea6e7c8a12658c0c08a',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola',
    'language': 'pt-br'
  }
}

const guesslineNotFoundWrongChampionship = {
  method: 'GET',
  url: '/guessline/getGuessLine?championshipRef=5872a8d00000000000000001',
  headers: {
    'token': '59bddea6e7c8a12658c0c0bb',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const guesslineNotFoundWrongUser = {
  method: 'GET',
  url: '/guessline/getGuessLine?championshipRef=5872a8d2ed1b02314e088291',
  headers: {
    'token': '59bddea6e7c8a12658c0c0bb',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

module.exports = {
  happyPathRequest,
  happyPathWithTranslateChampionshipRequest,
  guesslineNotFoundWrongChampionship,
  guesslineNotFoundWrongUser
}