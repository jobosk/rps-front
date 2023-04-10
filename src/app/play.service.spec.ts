import 'jest-preset-angular/setup-jest';
import { UUID } from 'angular2-uuid';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { PlayService } from './play.service';
import { MoveCodeEnum } from './model/moveCodeEnum';

describe('PlayService', () => {

  let service: PlayService;
  let userId = UUID.UUID();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a unique ID', () => {
    expect(environment.userId).not.toBeUndefined();
    expect(environment.userId).not.toBeNull();
    expect(environment.userId).not.toBe(null);
    expect(environment.userId).not.toEqual(null);
    //expect(environment.userId.toString()).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    expect(environment.userId.toString()).toMatch(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/i);
  });

  it('should make an HTTP call when calling playMove with a move', () => {
    environment.userId = userId;
    service.playMove(MoveCodeEnum.ROCK).subscribe(data =>
      expect(data).toBeNull()
    );
    const httpMock = TestBed.inject(HttpTestingController);
    const req = httpMock.expectOne(`${environment.apiUrl}/play/ROCK`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('x-user-id')).toEqual(true);
    expect(req.request.headers.get('x-user-id')).toBe(userId);
    httpMock.verify();
  });

  it('should make an HTTP call when calling revealPlay', () => {
    environment.userId = userId;
    service.revealPlay().subscribe(data =>
      expect(data).not.toBeNull()
    );
    const httpMock = TestBed.inject(HttpTestingController);
    const req = httpMock.expectOne(`${environment.apiUrl}/play/reveal`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('x-user-id')).toEqual(true);
    expect(req.request.headers.get('x-user-id')).toBe(userId);
    httpMock.verify();
  });
});
