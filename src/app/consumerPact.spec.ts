
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

    beforeAll(() => {
        mockProvider.setup()
            .then(() => environment.apiUrl = mockProvider.mockService.baseUrl)
    })

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [PlayService]
    }));

    afterAll(() => mockProvider.finalize())

    describe('the action of picking a move for the next play', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 doesn't have active plays`,
                uponReceiving: 'a user request to pick a move for the next play',
                withRequest: {
                    method: 'POST',
                    path: '/play/ROCK'
                },
                willRespondWith: {
                    status: 201
                }
            });
        })

        afterEach(() => mockProvider.verify())

        it('should accept the selected move by the user', (done) => {
            let playService = TestBed.inject(PlayService);
            playService.playMove(MoveCodeEnum.ROCK)
                .subscribe(response => {
                    done();
                });
        });
    });

    describe('the resolution of a play', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 previously selected rock`,
                uponReceiving: 'a request to resolve the current ongoing play',
                withRequest: {
                    method: 'GET',
                    path: '/play/reveal'
                },
                willRespondWith: {
                    status: 201,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: Matchers.eachLike({
                        moveByUser: 'ROCK',
                    }, { min: 1 })
                }
            });
        })

        afterEach(() => mockProvider.verify())

        it('should return a valid play resolution', (done) => {
            let playService = TestBed.inject(PlayService);
            playService.revealPlay()
                .subscribe(response => {
                    done();
                });
        });
    });
});