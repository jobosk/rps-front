
import { Pact, Matchers } from "@pact-foundation/pact";
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PlayService } from './play.service';
import { MoveCodeEnum } from "./model/moveCodeEnum";
import { environment } from "../environments/environment";

describe('consumer contract testing', () => {

    const path = require('path');
    const mockProvider = new Pact({
        consumer: 'rps-front',
        provider: 'rps-back',
        port: 4000,
        log: path.resolve(process.cwd(), 'logs', 'pact.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        timeout: 100000
    });

    beforeAll(() => mockProvider.setup())

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [PlayService]
    }));

    afterAll(() => mockProvider.finalize())

    describe('the action of picking "rock" as the move for the next play', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 doesn't have active plays`,
                uponReceiving: 'a user request to play "rock" next',
                withRequest: {
                    method: 'POST',
                    path: '/play/ROCK',
                    headers: {
                        "x-user-id": "00000000-0000-0000-0000-000000000000"
                    }
                },
                willRespondWith: {
                    status: 200
                }
            });
        })

        afterEach(() => mockProvider.verify())

        it('should accept the selected move by the user', (done) => {
            environment.userId = "00000000-0000-0000-0000-000000000000";
            environment.apiUrl = mockProvider.mockService.baseUrl;
            let playService = TestBed.inject(PlayService);
            playService.playMove(MoveCodeEnum.ROCK)
                .subscribe(() => done());
        });
    });

    describe('the action of picking "paper" as the move for the next play', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 doesn't have active plays`,
                uponReceiving: 'a user request to play "paper" next',
                withRequest: {
                    method: 'POST',
                    path: '/play/PAPER',
                    headers: {
                        "x-user-id": "00000000-0000-0000-0000-000000000000"
                    }
                },
                willRespondWith: {
                    status: 200
                }
            });
        })

        afterEach(() => mockProvider.verify())

        it('should accept the selected move by the user', (done) => {
            environment.userId = "00000000-0000-0000-0000-000000000000";
            environment.apiUrl = mockProvider.mockService.baseUrl;
            let playService = TestBed.inject(PlayService);
            playService.playMove(MoveCodeEnum.PAPER)
                .subscribe(() => done());
        });
    });

    describe('the action of picking "scissors" as the move for the next play', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 doesn't have active plays`,
                uponReceiving: 'a user request to play "scissors" next',
                withRequest: {
                    method: 'POST',
                    path: '/play/SCISSORS',
                    headers: {
                        "x-user-id": "00000000-0000-0000-0000-000000000000"
                    }
                },
                willRespondWith: {
                    status: 200
                }
            });
        })

        afterEach(() => mockProvider.verify())

        it('should accept the selected move by the user', (done) => {
            environment.userId = "00000000-0000-0000-0000-000000000000";
            environment.apiUrl = mockProvider.mockService.baseUrl;
            let playService = TestBed.inject(PlayService);
            playService.playMove(MoveCodeEnum.PAPER)
                .subscribe(() => done());
        });
    });

    describe('the resolution of a play', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 previously selected rock`,
                uponReceiving: 'a request to resolve the current ongoing play',
                withRequest: {
                    method: 'GET',
                    path: '/play/reveal',
                    headers: {
                        "x-user-id": "00000000-0000-0000-0000-000000000000"
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        moveByUser: Matchers.string('ROCK')
                        , moveByMachine: Matchers.somethingLike('PAPER')
                        , outcome: Matchers.somethingLike('USER_WINS')
                    }
                }
            });
        })

        afterEach(() => mockProvider.verify())

        it('should return a valid play resolution', (done) => {
            environment.userId = "00000000-0000-0000-0000-000000000000";
            environment.apiUrl = mockProvider.mockService.baseUrl;
            let playService = TestBed.inject(PlayService);
            playService.revealPlay()
                .subscribe(() => done());
        });
    });
});