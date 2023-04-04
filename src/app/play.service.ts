import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { PlayResult } from './model/playResult';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  userId: string;

  constructor(private http: HttpClient) {
    this.userId = UUID.UUID();
  }

  playMove(move: string): Observable<void> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-user-id', this.userId);
    return this.http.post<any>(environment.apiUrl + '/play/' + move, {}, { headers: headers });
  }

  revealPlay(): Observable<PlayResult> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-user-id', this.userId);
    return this.http.get<PlayResult>(environment.apiUrl + '/play/reveal', { headers: headers });
  }
}
