import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { PlayResult } from './model/playResult';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private http: HttpClient) {
  }

  playMove(userId: string, move: string): Observable<void> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-user-id', userId);
    return this.http.post<any>(environment.apiUrl + '/play/' + move, {}, { headers: headers });
  }

  revealPlay(userId: string): Observable<PlayResult> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-user-id', userId);
    return this.http.get<PlayResult>(environment.apiUrl + '/play/reveal', { headers: headers });
  }
}
