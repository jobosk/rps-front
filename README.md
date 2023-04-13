# Rock, paper & scissors

This is the front-end of a 'rock, paper & scissors' game.

## About

This application aims to provide a UI for a game, consuming the endpoints in the following [API definition](https://github.com/jobosk/rps-api).

The approach to develop this application was API-first, which implies that both the front-end and the back-end that consume and provide this API respectively, could be implemented in parallel.

In this case, that means we could use code generation tools like [Swagger Editor](https://editor.swagger.io/) to assist in the process of implementing consumers for those endpoints, and we could use tools like [Pact](https://pact.io/) to implement contract tests that validate such consumers against the API definition itself.

## Requirements

This project is paired with [its back-end](https://github.com/jobosk/rps-service), so be sure to check that out before proceeding, to setup both the infrastructure and the back-end server required to run this app.

It also expects to have both [Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed, and run the following command to install all the required dependencies:
```
npm install
```

The Pact.io library used to run contact tests also incorporates several requirements, such as having [node-gyp](https://github.com/nodejs/node-gyp#installation) installed, and several other described in [their documentation](https://github.com/pact-foundation/pact-js-core#installation), that might cause [some problems](https://docs.pact.io/implementation_guides/javascript/docs/troubleshooting) if not complied with. If you encounter any problems during the installation process, go back to the previous link to troubleshoot them.

## Running

> **Note:** To run this web application, the back-end server must be running. Follow [these instructions](https://github.com/jobosk/rps-service#installation) in order to do so.

Run `npm start` (or `ng serve`, if you have the [Angular CLI installed](https://angular.io/cli) installed) to run the project.

## Testing

> **Note:** Among these tests there is a contract test that publishes a consumer pact in a local Pact Broker, so before running this particular test, one must follow [the instructions](https://github.com/jobosk/rps-service#testing) to setup the local testing environment from the back-end repository.

Run `npm test` (or `ng test`, if you have the [Angular CLI installed](https://angular.io/cli) installed) to execute the unit tests with [Jest](https://jestjs.io).

Once the consumer's contract test is executed, the contract itself will be stored as a JSON file in the /pacts directory.\
To publish the contract in the local broker, so the back-end contract tests have a consumer pact to validate against, the following command must be run:
```
npm run publish-pacts
```
