docker run --rm -w /data -v %cd%/pacts:/data/pacts --network host -e PACT_BROKER_BASE_URL=http://:9292 -e PACT_BROKER_USERNAME=pact_rps -e PACT_BROKER_PASSWORD=pact_rps pactfoundation/pact-cli:latest publish /data/pacts --consumer-app-version 1.0.0