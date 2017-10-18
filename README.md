# IGuess-API-Guess
API Microservice responsible by match prediction and users leagues
##### GuessLine 
Everything that linked with predictions.
##### GuessLeague 
About the users leagues.
##### MongoDB
The Guess Microservice have a user to guessDB Read and Write and to the holiDB read-only

## Stack
* Node.js v8.x.x // NPM v5.X
* MongoDB v3.4
* Redis v3.2.6

## Pre-established pattern 
* Env variables are always called at config, with Capitalize and Underscore
* Enums are used with Capitalize
* The function are accessed by module.exports, there are no dependencia injected
* The file index.js is a pattern to export file
* There are no console.log or console.error, all console used is from Pino, a NPM installed
* The requires libs and variables at top file mandatorily need to follow the sequence: NPM modules, localFiles, Global Variables, Variables

## Language
All functions and variables need to be in English

## Folder layers responsibilities
##### Routes
Responsible to declare Routes, with Rest Verb, url path, call the schemas and handler the request
##### Schema
Responsible to fix a schema pattern to response/request/headers. All route need to have schemas.
##### Controller
Responsible to response the request, error or success
##### Service¹
Responsible to treat clientErrors, cache logic, some bussiness Rule, multiple repositories logic
##### Routines
Responsible fire events to get from Holi the championships, matchDays and matchDays results
##### Models²
Responsible to declare a collection pattern, indexes, requireds fields
##### Repositories
Responsible by external connections, HTTP, SOAP, GraphQL, SQL, noSQL, etc.

1. Anemic Models need to be avoided, it is possible elimine some layers if necessary
2. There are a Schema for each Collection at MongoDB

## Folders structure

```
app.js
src
  ├── routes
  │   ├── login
  │   │   ├── index.js
  │   │   ├── signUpRoutes.js
  │   │   ├── signInRoutes.js
  |   |   ├── schemas.js
  |   |   |   ├── signUpSchemas.js
  |   |   |   ├── signInSchemas.js
  │   ├── availability
  │   │   ├── index.js
  │   │   ├── userNameAvailabilityRoutes.js
  |   |   ├── schemas.js
  |   |   |   ├── userNameAvailabilitySchemas.js
  ├── controllers
  │   ├── login  
  │   │   ├── signUpController.js
  │   │   ├── signInController.js
  │   ├── availability
  │   │   ├── userNameAvailabilityController.js
  ├── services
  │   ├── login  
  │   │   ├── signUpService.js
  │   │   ├── signInService.js
  │   ├── availability
  │   │   ├── userNameAvailabilityService.js
  ├── routines
  │   ├── updatePontuationRoutine  
  │   │   ├── cronTime.js
  │   │   ├── updateGuessLinesPredictionsPontuationsRoutine.js
  │   │   ├── functions
  ├── models  
  │   ├── profileModel.js
  │   ├── optionsModel.js
  ├── repositories
  │   ├── login
  │   │   ├── signUpRepository.js
  │   │   ├── signInRepository.js
  │   ├── availability
  │   │   ├── userNameAvailabilityRepository.js
test
  ├── (TODO: terminar readMe )
```
