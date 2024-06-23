import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidatepassService {
  private _httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }
  
  getData(apiUrl: string) {
    return this._httpClient.get(apiUrl);
  }

  postData(apiUrl: string, pass: string, header: HttpHeaders) {
    return this._httpClient.post(apiUrl, pass, {headers: header});
  }
}
