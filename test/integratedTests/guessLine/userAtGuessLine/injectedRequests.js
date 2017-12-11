const happyPathRequestUserAtGuessLine = {
  method: 'GET',
  url: '/guessline/userAtGuessLine?userRef=59bddea6e7c8a12658c0c08a&championshipRef=5872a8d2ed1b02314e088291',
  headers: {
    'token': '59bddea6e7c8a12658c0c08a',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

const happyPathUserIsntAtGuessLine = {
  method: 'GET',
  url: '/guessline/userAtGuessLine?userRef=59bddea6e7c8a12658c0c044&championshipRef=5872a8d2ed1b02314e088291',
  headers: {
    'token': '59bddea6e7c8a12658c0c044',
    'request_id': 'postmanRequest',
    'hardware_fingerprint': 'postmanRequest',
    'platform': 'Android',
    'os_version': '7.0.1',
    'app_version': '1.0.0',
    'phone_model': 'XT-1792',
    'phone_fabricator': 'Motorola'
  }
}

module.exports = {
  happyPathRequestUserAtGuessLine,
  happyPathUserIsntAtGuessLine
}