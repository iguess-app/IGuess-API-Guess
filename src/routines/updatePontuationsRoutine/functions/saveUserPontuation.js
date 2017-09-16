'use strict'

const _saveUserPontuation = (fixturePontuation, userPredictions, fixture, Pontuations) => {
  
    const searchQuery = {
      championshipUserKey: `${fixture.championshipRef}_${userPredictions.userRef}`
    }
    Pontuations.findOne(searchQuery)
      .then((userPontuation) => {
        if (!userPontuation) {
          return _addNewUserPontuationDoc(fixturePontuation, userPredictions, fixture, Pontuations)
        }
        const pontuationByFixtureAlreadySettedIndex = userPontuation.pontuationByFixture.findIndex((fixtureSinglePontuation) => fixtureSinglePontuation.fixture === fixture.fixture)
        if (_thereIsFixturePontuationAlready(pontuationByFixtureAlreadySettedIndex)) {
          return _updateFixtureUserPontuation(userPontuation, pontuationByFixtureAlreadySettedIndex, fixturePontuation)
        }
        
        return _createNewFixturePontuation(userPontuation, fixturePontuation, fixture)
      })
  }
  
  const _addNewUserPontuationDoc = (fixturePontuation, userPredictions, fixture, Pontuations) => {
    const newPontuationObj = {
      championshipUserKey: `${fixture.championshipRef}_${userPredictions.userRef}`,
      userRef: userPredictions.userRef,
      championshipRef: fixture.championshipRef,
      totalPontuation: fixturePontuation,
      pontuationByFixture: [{
        fixture: fixture.fixture,
        pontuation: fixturePontuation
      }]
    }
  
    return Pontuations.create(newPontuationObj)
  }

  const _thereIsFixturePontuationAlready = (pontuationByFixtureAlreadySettedIndex) => pontuationByFixtureAlreadySettedIndex >= 0

  const _updateFixtureUserPontuation = (userPontuation, pontuationByFixtureAlreadySettedIndex, fixturePontuation) => {
    userPontuation.pontuationByFixture[pontuationByFixtureAlreadySettedIndex].pontuation = fixturePontuation
    userPontuation.totalPontuation = _calculateTotalPontuation(userPontuation)

    return userPontuation.save()
  }

  const _createNewFixturePontuation = (userPontuation, fixturePontuation, fixture) => {
    const newFixturePontuation = {
      fixture: fixture.fixture,
      pontuation: fixturePontuation
    }
    userPontuation.pontuationByFixture.push(newFixturePontuation)
    userPontuation.totalPontuation = _calculateTotalPontuation(userPontuation)

    return userPontuation.save()
  }

  const _calculateTotalPontuation = (userPontuation) => userPontuation.pontuationByFixture
  .reduce((prevValue, pontuationByFixture) => prevValue + pontuationByFixture.pontuation, 0)

module.exports = _saveUserPontuation

/*eslint max-params: [2, 4]*/
/*eslint no-magic-numbers: 0*/