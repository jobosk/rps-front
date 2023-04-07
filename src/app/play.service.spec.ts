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

  it('should make an HTTP call when calling playMove with a move', () => {
    service.playMove(userId, MoveCodeEnum.ROCK).subscribe(data =>
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
    service.revealPlay(userId).subscribe(data =>
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
