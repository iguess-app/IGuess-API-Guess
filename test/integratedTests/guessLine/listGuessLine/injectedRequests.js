const happyPathRequest = {
  method: 'GET',
  url: '/guessline/listUserGuessesLines',
  headers: {
    token: '59bddea6e7c8a12658c0c08a',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const happyPathWithPontuation = {
  method: 'GET',
  url: '/guessline/listUserGuessesLines?&showPontuation=true',
  headers: {
    token: '59bddea6e7c8a12658c0c08a',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const happyPathOnlyActive = {
  method: 'GET',
  url: '/guessline/listUserGuessesLines?onlyActive=true',
  headers: {
    token: '59bddea6e7c8a12658c0c0bb',
    'request_id': 'integratedTest',
    'hardware_fingerprint': 'integratedTest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const noGuessLinesFound = {
  method: 'GET',
  url: '/guessline/listUserGuessesLines',
  headers: {
    token: '59bddea6e7c8a12658c0c033',
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
  happyPathWithPontuation,
  happyPathOnlyActive,
  noGuessLinesFound
}