import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IkeysResponse, IEncryptResponse } from '../models/key.model';
import { AuthService } from './auth.service';

const api = '/api';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  private keys

  getKeys(id?): Promise<IkeysResponse> {
    if (this.keys) {
      return new Promise((res, rej) => {
        res(this.keys)
      })
    }

    if (id) {
      return new Promise((res, rej) => {
        this.fireDb.object(`users/${id}`).valueChanges().subscribe((val: any) => {
          const response = {
            privateKey: val.privateKey,
            publicKey: val.publicKey
          }

          this.keys = response;
          res(response)
        })
      })
    }

    return <Promise<IkeysResponse>> this.http.get(`${api}/keys`).toPromise()
      .then(res => this.keys = res);
  }

  encrypt(message: string, key: string): Promise<IEncryptResponse> {
    return <Promise<IEncryptResponse>> this.http.post(`${api}/encrypt`, {
      publicKey: key,
      content: message
    }).toPromise()
  }

  decrypt(message: string, key: string): Promise<IEncryptResponse> {
    return <Promise<IEncryptResponse>>this.http.post(`${api}/decrypt`, {
      privateKey: key,
      content: message
    }).toPromise()
  }

  constructor(
    private http: HttpClient,
    private fireDb: AngularFireDatabase,
    // private authService: AuthService
  ) { }
}
