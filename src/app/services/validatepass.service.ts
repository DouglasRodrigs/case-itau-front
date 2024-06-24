import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface User {
  clientId: string;
  username: string;
  password: string;
  grantType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatepassService {
  private _httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  getToken(user: User): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.post<string>(environment.apiToken, user, { headers });
  }
  
  getData(apiUrl: string) {
    return this._httpClient.get(apiUrl);
  }

  postData(apiUrl: string, pass: string, header: HttpHeaders) {
    return this._httpClient.post(apiUrl, pass, {headers: header});
  }
}
