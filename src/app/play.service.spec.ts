import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { PlayService } from './play.service';
import { MoveCodeEnum } from './model/moveCodeEnum';

describe('PlayService', () => {

  let service: PlayService;

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
    expect(service.userId).not.toBeUndefined();
    expect(service.userId).not.toBeNull();
    expect(service.userId).not.toBe(null);
    expect(service.userId).not.toEqual(null);
    //expect(service.userId.toString()).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    expect(service.userId.toString()).toMatch(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/i);
  });

  it('should make an HTTP call when calling playMove with a move', () => {
    service.playMove(MoveCodeEnum.ROCK).subscribe(data =>
      expect(data).toBeNull()
    );
    const httpMock = TestBed.inject(HttpTestingController);
    const req = httpMock.expectOne(`${environment.apiUrl}/play/ROCK`);
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('should make an HTTP call when calling revealPlay', () => {
    service.revealPlay().subscribe(data =>
      expect(data).not.toBeNull()
    );
    const httpMock = TestBed.inject(HttpTestingController);
    const req = httpMock.expectOne(`${environment.apiUrl}/play/reveal`);
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });
});
