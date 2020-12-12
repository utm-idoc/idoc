import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IkeysResponse, IEncryptResponse } from '../models/key.model';

const api = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  getKeys(): Promise<IkeysResponse> {
    return <Promise<IkeysResponse>> this.http.get(`${api}/keys`).toPromise();
  }

  encrypt(message: string, key: string): Promise<IEncryptResponse> {
    return <Promise<IEncryptResponse>> this.http.post(`${api}/encrypt`, {
      body: {
        publicKey: key,
        content: message
      }
    }).toPromise()
  }

  constructor(
    private http: HttpClient
  ) { }
}
