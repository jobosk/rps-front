# Rock, paper & scissors

This is the front-end of a 'rock, paper & scissors' game.

## Related projects

This project is paired with [its back-end](https://github.com/jobosk/rps-service). Be sure to check that out to setup both the infrastructure and back-end server required to run this app.

Be sure to do that before proceeding.

## Running

> **Note:** To run this web application, the back-end server must be running. Follow [these instructions](https://github.com/jobosk/rps-service#installation) in order to do so.

Run `npm start` (or `ng serve`) to run the project.

## Testing

> **Note:** Among these tests there is a contract test that publishes a consumer pact in a local Pact Broker, so before running this particular test, one must follow [the instructions](https://github.com/jobosk/rps-service#testing) to setup the local testing environment from the back-end repository.

Run `npm test` (or `ng test`) to execute the unit tests with [Jest](https://jestjs.io).

Once the consumer's contract test is executed, th contract itself will be stored as a JSON file in the /pacts directory.\
To publish the contract in the local broker, so the back-end contract tests can be executed, the following command must be run:
```
npm run publish-pacts
```
