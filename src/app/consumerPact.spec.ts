
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
            playService.playMove(MoveCodeEnum.SCISSORS)
                .subscribe(() => done());
        });
    });

    describe('the action of picking "lizard" as the move for the next play', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 doesn't have active plays`,
                uponReceiving: 'a user request to play "lizard" next',
                withRequest: {
                    method: 'POST',
                    path: '/play/LIZARD',
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
            playService.playMove(MoveCodeEnum.LIZARD)
                .subscribe(() => done());
        });
    });

    describe('the action of picking "spock" as the move for the next play', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 doesn't have active plays`,
                uponReceiving: 'a user request to play "spock" next',
                withRequest: {
                    method: 'POST',
                    path: '/play/SPOCK',
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
            playService.playMove(MoveCodeEnum.SPOCK)
                .subscribe(() => done());
        });
    });

    describe('the resolution of a game where user played "rock"', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 previously selected "rock"`,
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

    describe('the resolution of a game where user played "paper"', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 previously selected "paper"`,
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
                        moveByUser: Matchers.string('PAPER')
                        , moveByMachine: Matchers.somethingLike('PAPER')
                        , outcome: Matchers.somethingLike('TIE')
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

    describe('the resolution of a game where user played "scissors"', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 previously selected "scissors"`,
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
                        moveByUser: Matchers.string('SCISSORS')
                        , moveByMachine: Matchers.somethingLike('ROCK')
                        , outcome: Matchers.somethingLike('MACHINE_WINS')
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

    describe('the resolution of a game where user played "lizard"', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 previously selected "lizard"`,
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
                        moveByUser: Matchers.string('LIZARD')
                        , moveByMachine: Matchers.somethingLike('SPOCK')
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

    describe('the resolution of a game where user played "spock"', () => {

        beforeAll(() => {
            return mockProvider.addInteraction({
                state: `user 00000000-0000-0000-0000-000000000000 previously selected "spock"`,
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
                        moveByUser: Matchers.string('SPOCK')
                        , moveByMachine: Matchers.somethingLike('PAPER')
                        , outcome: Matchers.somethingLike('MACHINE_WINS')
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